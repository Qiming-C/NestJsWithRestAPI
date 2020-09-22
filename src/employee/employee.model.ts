import * as mongoose from 'mongoose';

export const EmployeeSchema= new mongoose.Schema(
    {

        //
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        companyId:{type:Number,required:true},
        password:{type:String,required:true},
        positionTitle:{type:String,required:true},
        companyName:{type:String,required:true},
        projectIds:[{type:Number,required:true}],
        isManager:{type:Boolean,required:true},
        employeeId:{type:Number,required:true},
        managerId:{type:Number,required:false},
        email:{type:String,required:true},
        startDate:{type:String,required:true}


    }
);

//extend pacakage is from npm install --save-dev @types/mongoose
export interface Employee extends mongoose.Document{
    id:string;
    firstName:string;
    lastName:string;
    companyId:number;
    password:string;
    positionTitle:string;
    companyName:string;
    projectIds: number[];
    isManager:boolean;
    employeeId:number;
    managerId:number;
    email:string;
    startDate:string;
};