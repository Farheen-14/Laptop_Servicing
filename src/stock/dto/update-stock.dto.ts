import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';

export class UpdateStockDto extends PartialType(CreateStockDto) {
    model_no : number

    part_name : string

    qty : []

    price : number

    isAvailable : Boolean
}
