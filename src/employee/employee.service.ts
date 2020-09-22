import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Employee} from './employee.model';
import {Model} from 'mongoose';


@Injectable()
export class EmployeeService
{
        
    //@InjectModel the name of model we want to inject
    //readonly ensure we won't override the model
    constructor(@InjectModel('Employee') private readonly employeeModel:Model<Employee>){}

    //insert employee
    async insertEmployee(
        firstName:string,
        lastName:string,
        companyId:number,
        password:string,
        positionTitle:string,
        companyName:string,
        projectIds: number[],
        isManager:boolean,
        employeeId:number,
        managerId:number,
        email:string,
        startDate:string)
        {
            const newEmployee=new this.employeeModel({
                firstName:firstName,
                lastName:lastName,
                companyId:companyId,
                password:password,
                positionTitle:positionTitle,
                companyName:companyName,
                projectIds:projectIds,
                isManager:isManager,
                employeeId:employeeId,
                managerId:managerId,
                email:email,
                startDate:startDate

            })

            const result = await newEmployee.save();

            return result.id as string;
        }


    //get all employees
    async getAllEmployees()
    {
        const employees =await this.employeeModel.find().exec();
        return employees;
    }

    //get single employee
    async getSingleEmployee(employeeId:number)
    {
        const employee=await this.findEmployee(employeeId);
        return{employee};
        
    }

    //update the employee
    async updateEmployee(
        firstName:string,
        lastName:string,
        companyId:number,
        password:string,
        positionTitle:string,
        companyName:string,
        projectIds: number[],
        isManager:boolean,
        employeeId:number,
        managerId:number,
        email:string,
        startDate:string)
        {
            
            //get the product from DB
            const updatedEmployee=await this.findEmployee(employeeId);
            
            if (firstName) {
                updatedEmployee.firstName = firstName;
            }
            if (lastName) {
                updatedEmployee.lastName = lastName;
            }
            if (companyId) {
                updatedEmployee.companyId = companyId;
            }
            if (password) {
                updatedEmployee.password = password;
            }
            if (positionTitle) {
                updatedEmployee.positionTitle = positionTitle;
            }
            if (companyName) {
                updatedEmployee.companyName = companyName;
            }
            if (projectIds) {
                updatedEmployee.projectIds = projectIds;
            }
            if (isManager) {
                updatedEmployee.isManager = isManager;
            }
            if (employeeId) {
                updatedEmployee.employeeId = employeeId;
            }
            if (managerId) {
                updatedEmployee.managerId = managerId;
            }
            if (email) {
                updatedEmployee.email = email;
            }
            if (startDate) {
                updatedEmployee.startDate = startDate;
            }
            
            
            //save the update to the DB
            updatedEmployee.save();
            
        }


    async deleteEmployee(employeeId:number)
    {
        const result=await this.employeeModel.deleteOne({employeeId:employeeId}).exec();

        if(result.n==0)
        {
            throw new NotFoundException('Did not find the employee');
        }
    }


    //find employee method
    //return the employee from mongoDb by ID
    private async findEmployee(employeeId: number): Promise<Employee> {
        
        let employee;
        try {
            employee = await this.employeeModel.findOne({employeeId:employeeId}).exec();
        } catch (error) {
            throw new NotFoundException('Could not find this person');
        }
        if (!employee) {
            //nestjs will auto send 404 not found
            throw new NotFoundException('Could not find the id');
        }
        
        return employee;
    }
}