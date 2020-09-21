import { from } from "rxjs";
import{Controller, Post, Body,Get, Param, Patch,Delete} from '@nestjs/common';
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController
{
        constructor(private readonly productService:ProductService){}
    @Post()
    addProduct(
        @Body('titile') prodTitle:string,
        @Body('description') proDesc:string,
        @Body('price') prodPrice:number
        ):any
    {   
            const generatedId=this.productService.insertProduct(prodTitle,proDesc,prodPrice);

            return{id: generatedId};
    }    

    @Get()
    getAllProducts()
    {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId:string)
    {
            return this.productService.getSingleProduct(prodId);
    }

    
    @Patch(':id')
    updateProduct
    (
        @Param('id')prodId:string,
        @Body('title') prodTitle:string,
        @Body('description')prodDesc:string,
        @Body('price')price:number
    )
    
    {
        this.productService.updateProduct(prodId,prodTitle,prodDesc,price);
        
        //we could return data if we want
        return null; 
    }


    @Delete(':id')
    removeProduct
    (@Param('id')prodId:string)
    {
        return this.productService.deleteProduct(prodId);
        return null;
    }

}