import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const newProduct = new Product(uuidv4(), title, desc, price);
    this.products.push(newProduct);

    return newProduct.id;
  }

  getProducts() {
    const productsCopy = [...this.products];
    return productsCopy;
  }

  getOneProduct(key: string) {
    const product = this.findProduct(key)[0];
    if (product) {
      return { ...product };
    } else {
      throw new NotFoundException('Cound not find the product');
    }
  }

  updateProduct(key: string, title: string, desc: string, price: number) {
    // find the product id
    const [product, index] = this.findProduct(key);

    //make a copy
    const updatedProduct = { ...product };

    //udpate values if they are populated
    if (title) updatedProduct.title = title;
    if (desc) updatedProduct.desc = desc;
    if (price) updatedProduct.price = price;

    //replace the value after its been udpated
    this.products[index] = updatedProduct;

    //return updated value
    return this.products[index];
  }

  deleteProduct(key: string) {
    //this will find a propuct and delete it
    const [product, index] = this.findProduct(key);

    //use splice to remove an element at a specific array
    this.products.splice(index, 1);

    return this.products;
  }

  private findProduct(key: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (element) => element.id === key,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product in memory');
    }
    return [product, productIndex];
  }
}
