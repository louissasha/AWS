import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Patch,
  Param,
  Put,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  // to inject a service into the controller to be able to call the functions in that service we add them in the constructor
  constructor(private readonly productService: ProductService) {}
  //add a way to add more products to my list using a Post request

  @Post()
  addProduct(@Body() body: Product): any {
    const { title, desc, price } = body;
    const id = this.productService.insertProduct(title, desc, price);

    console.log(body);
    // console.log(this.productService.products);

    return { id: id };

    //this.productService.insertProduct();
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param() params) {
    console.log(params);

    return this.productService.getOneProduct(params.id);
  }

  @Patch(':id')
  updateProduct(@Param() params, @Body() product) {
    //use thd to find the product and then adust the product and replace it in the array
    const { title, desc, price } = product;

    const { id } = params;
    //cons;
    const updatedProduct = this.productService.updateProduct(
      id,
      title,
      desc,
      price,
    );

    return updatedProduct;
  }

  @Delete(':id')
  deleteProduct(@Param() params: any) {
    //this will delete a product
    const id = params.id;

    return this.productService.deleteProduct(id);
  }
}
