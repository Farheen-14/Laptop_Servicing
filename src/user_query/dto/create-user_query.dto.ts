import { Repair_Type } from "../entities/repairtype.enum"

export class CreateUserQueryDto {
    company_name : string
    model_no : string
    serial_no : string
    select_repair : Repair_Type
    description_of_problem : string
    status : boolean
}
