import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
    {
        //mongo write uppter case which is javascript type not typescript
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true }
    }
);



//extend pacakage is from npm install --save-dev @types/mongoose 
export interface Product extends mongoose.Document {
    id: string;
    title: string;
    description: string;
    price: number;

};