import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserQueryDto } from './dto/create-user_query.dto';
import { UpdateUserQueryDto } from './dto/update-user_query.dto';
import { UserQuery } from './entities/user_query.entity';

@Injectable()
export class UserQueryService {
  constructor(@InjectRepository(User) private readonly userRepo : Repository<User>,
  @InjectRepository(UserQuery) private readonly queryRepo : Repository<UserQuery>){}

  async postQuery(createUserQueryDto: CreateUserQueryDto,user) {
    const getOne = await this.userRepo.findOne({where : {id : user.id}})   
    if(getOne.role != 'user') throw new UnauthorizedException()
    const createUserQuery = this.queryRepo.create(createUserQueryDto)
    const checkExisting = await this.queryRepo.findOne({where : {serial_no: createUserQuery.serial_no ,status : true}})   
    if(checkExisting != null ) throw new BadRequestException(`Query already exist with Serial_No. ${createUserQuery.serial_no}`)
    createUserQuery.user = user 
    return this.queryRepo.save(createUserQuery)
  }

  async findAll(user) {
    // console.log("user",user);
    const checkRole = await this.userRepo.findOne({where : {role : user.role} })
    if(checkRole.role == 'service_eng' || checkRole.role == 'user'){
      const getAll = await this.queryRepo.find()
      return getAll
    }
    throw new NotFoundException()

    // return checkRole    
    // const getUser = await this.queryRepo.find()
    // // const getUser = await this.queryRepo.find({where : {user : user}})
    // console.log(getUser);
    
    // // if(getUser.length == 0) throw new NotFoundException()
    // return getUser
  }

  async findOne(id: string, user) {
    const getFromDb = await this.queryRepo.findOne({where : {query_id : id}})
    if(getFromDb == null) throw new NotFoundException()  
    if(getFromDb.user.id != user.id) throw new UnauthorizedException() 
    return getFromDb
  }

  async update(id: string, updateUserQueryDto: UpdateUserQueryDto,user) {
  const getFromDb = await this.queryRepo.findOne({where : {query_id : id}})
  if(getFromDb == null) throw new NotFoundException()  
  if(getFromDb.user.id != user.id) throw new UnauthorizedException() 
    const saveData = Object.assign(getFromDb,updateUserQueryDto)   
    saveData.user = user
    return this.queryRepo.save(saveData)
  }

  async remove(id: string, user) {
    const getFromDb = await this.queryRepo.findOne({where : {query_id : id}})
    if(getFromDb == null) throw new NotFoundException()  
    if(getFromDb.user.id != user.id) throw new UnauthorizedException()
    const removeData = await this.queryRepo.remove(getFromDb)   
    return `Removed successfull with user id ${user.id}`;
  }
}
