import { Injectable ,NotFoundException} from "@nestjs/common";

import {Product} from './product.model';
@Injectable()
export class ProductService {
        private products:Product[]=[];

        insertProduct(title:string,desc:string,price:number)
        {
            const prodId=Math.random().toString();
            const newProduct=new Product(prodId,title,desc,price);
            this.products.push(newProduct);
            return prodId;
        } 


        getProducts()
        {
            //this will be a new object array
            //because this.products will send the pointer that is risky
            return [...this.products];
        }

        getSingleProduct(productId:string)
        {
            const product=this.findProduct(productId)[0];

            return {...product};
        } 

        updateProduct(prodId:string,title:string,desc:string,price:number)
        {
                //thse equivalent to the thrid line
                //const product=this.findProduct(prodId)[0];
                //const index=this.findProduct(prodId)[1];
                const [product,index]=this.findProduct(prodId);
                const updatedProduct={...product};
                if(title)
                {
                    updatedProduct.title=title;
                }
                if(desc)
                {
                    updatedProduct.description=desc;
                }
                if(price)
                {
                    updatedProduct.price=price;
                }
                
                //update the product
                this.products[index]=updatedProduct;
        }


        deleteProduct(prodId:string)
        {
            const index=this.findProduct(prodId)[1];
            this.products.splice(index,1);
        }
        

        //find product method
        //return product and the index of product
        private findProduct(prodId:string):[Product,number]
        {
            const productIndex=this.products.findIndex((prod)=>prod.id===prodId);
            const product=this.products[productIndex];
            if(!product)
            { 
                //nestjs will auto send 404 not found
                throw  new NotFoundException('Could not find the id');
            }

            return [product,productIndex];
        }
}