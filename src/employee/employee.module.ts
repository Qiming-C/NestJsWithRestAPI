import {Module} from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import {MongooseModule} from '@nestjs/mongoose';
import { EmployeeSchema } from './employee.model';


@Module(
    {
        //import mongoosemodule make injectable
        imports:[MongooseModule.forFeature([{name: 'Employee',schema:EmployeeSchema}])],
        controllers:[EmployeeController],
        providers:[EmployeeService],
    }
)

export class EmployeesModule{}