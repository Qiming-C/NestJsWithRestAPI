import {Module} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import {MongooseModule} from '@nestjs/mongoose';
import { ProductSchema } from './product.model';

@Module(
    {
        //import mongoosemodule make injectable
        imports:[MongooseModule.forFeature([{name: 'Product',schema:ProductSchema}])],
        controllers:[ProductsController],
        providers:[ProductService],
    }
)

export class ProductsModule{}