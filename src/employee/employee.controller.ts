import {Controller,Post,Body, Get, Param, Patch,Delete} from '@nestjs/common';
import {EmployeeService} from './employee.service';



@Controller('employees')
export class EmployeeController{

    constructor(private readonly employeeService:EmployeeService){}




    @Post()
    async addEmployee(
        @Body('firstName') firstName:string,
        @Body('lastName')  lastName:string,
        @Body('companyId') companyId:number,
        @Body('password')  password:string,
        @Body('positionTitle') positionTitle:string,
        @Body('companyName')   companyName:string,
        @Body('projectIds')    projectIds:number[],
        @Body('isManager')     isManager:boolean,
        @Body('employeeId')    employeeId:number,
        @Body('managerId') managerId:number,
        @Body('email') email:string,
        @Body('startDate') startDate:string
        )
    {
            const generatedId= await this.employeeService.insertEmployee(firstName,lastName,companyId,password,positionTitle,companyName,projectIds,isManager,employeeId,managerId,email,startDate);
            
            return {id:generatedId};

    }


    @Get(':employeeId')
    async getSingleEmployee(@Param('employeeId') employeeId:number)
    {
            const employee=await this.employeeService.getSingleEmployee(employeeId);
            return employee;
    }

    @Get()
    async getAllEmployees()
    {
        const employees=await this.employeeService.getAllEmployees();
        return employees;
    }


    @Patch(':employeeId')
    async updateEmployee
    (
        @Param('employeeId') employeeId:number,
        @Body('firstName') firstName:string,
        @Body('lastName')  lastName:string,
        @Body('companyId') companyId:number,
        @Body('password')  password:string,
        @Body('positionTitle') positionTitle:string,
        @Body('companyName')   companyName:string,
        @Body('projectIds')    projectIds:number[],
        @Body('isManager')     isManager:boolean,
        @Body('managerId') managerId:number,
        @Body('email') email:string,
        @Body('startDate') startDate:string

    )   {
                
                await this.employeeService.updateEmployee(firstName,lastName,companyId,password,positionTitle,companyName,projectIds,isManager,employeeId,managerId,email,startDate);

                //we could return data if we want
                return null;
    }
    
    
    @Delete(':employeeId')
    async deleteEmployee(
        @Param('employeeId') employeeId:number
        
    )
    {
        await this.employeeService.deleteEmployee(employeeId);

        return {"message":"the employee has been removed"};
    }

}