import { BadRequestException, ExecutionContext, UnauthorizedException, CanActivate } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { verify } from "jsonwebtoken";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

export class AuthGuard implements CanActivate{
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>){}

    async canActivate(context : ExecutionContext){
        const req = context.switchToHttp().getRequest()
        if(req.headers.authorization == undefined) throw new BadRequestException("Token must be there")
        const [,token] = req.headers.authorization.split(" ")
        if(!token) throw new BadRequestException("Token must be there")
        try {
           const payload =  verify(token,'secret')
           const email = payload['email']
           const getUser = await this.userRepo.findOne({where : {email : email}})

           req.user = getUser
           return true
        }
        catch(err){
            throw new UnauthorizedException()
        }

    }
    
}