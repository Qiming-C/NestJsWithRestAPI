import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';
@Injectable()
export class ProductService {
    private products: Product[] = [];

    //@InjectModel the name of model we want to inject
    //readonly ensure our won't override the productModel
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {

        const newProduct = new this.productModel({ title: title, description: desc, price: price });
        const result = await newProduct.save();


        return result.id as string;
    }

    //get all products
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }


    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);

        return { id: product.id, title: product.title, description: product.description, price: product.price };
    }

    async updateProduct(prodId: string, title: string, desc: string, price: number) {
        //get the product from DB
        const updatedProduct = await this.findProduct(prodId);

        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }

        updatedProduct.save();
    }

    //delete product by ID
    async deleteProduct(prodId: string) {
        //attention should be _id, because mongoDB id is _id this is filter 
        const result =await this.productModel.deleteOne({ _id: prodId }).exec();
        
        //we should aware that if we delete a id which is not valid, we should return 404 rather than 200
        if(result.n===0)
        {
                throw new NotFoundException("Did not found the product");
        }
        
    }


    //find product method
    //return the product from mongoDb by ID
    private async findProduct(prodId: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(prodId);
        } catch (error) {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            //nestjs will auto send 404 not found
            throw new NotFoundException('Could not find the id');
        }

        return product;
    }
}