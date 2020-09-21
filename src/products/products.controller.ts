import { from } from "rxjs";
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService) { }
    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') proDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = await this.productService.insertProduct(prodTitle, proDesc, prodPrice);

        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        //need to wait until the service return the promise
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productService.getSingleProduct(prodId);
    }


    @Patch(':id')
    async updateProduct
        (
            @Param('id') prodId: string,
            @Body('title') prodTitle: string,
            @Body('description') prodDesc: string,
            @Body('price') price: number
        ) {
        await this.productService.updateProduct(prodId, prodTitle, prodDesc, price);

        //we could return data if we want
        return null;
    }


    @Delete(':id')
    async removeProduct
        (@Param('id') prodId: string) {
        await this.productService.deleteProduct(prodId);
        return null;
    }

}