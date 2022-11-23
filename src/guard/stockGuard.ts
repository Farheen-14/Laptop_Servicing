import { BadRequestException, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { Observable } from "rxjs";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";


export class StockInc implements CanActivate {
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>){}

    canActivate(context: ExecutionContext) {
        try{
            const getRequest =  context.switchToHttp().getRequest()
            const role = getRequest.user.role
            if(role == 'stock_inc') return true;
            throw new  UnauthorizedException("Not a Stock_Incharge")
            // console.log(role);
        }
        catch(err) {
            throw new UnauthorizedException()
        }

    }
}