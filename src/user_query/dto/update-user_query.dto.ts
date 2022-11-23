import { PartialType } from '@nestjs/mapped-types';
import { Repair_Type } from '../entities/repairtype.enum';
import { CreateUserQueryDto } from './create-user_query.dto';

export class UpdateUserQueryDto extends PartialType(CreateUserQueryDto) {
    company_name : string
    model_no : string
    serial_no : string
    select_repair : Repair_Type
    description_of_problem : string
    status : boolean
}
