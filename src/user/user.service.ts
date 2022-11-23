import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {sign} from 'jsonwebtoken'
import * as moment from "moment";
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo : Repository<User> ){}

  async signup(createUserDto : CreateUserDto){
    const getExisting = await this.userRepo.findOne({where : {email : createUserDto.email}})
    if(getExisting) throw new BadRequestException("Email already taken")
    const hashpassword = await argon2.hash(createUserDto.password) 
    if(!createUserDto.role) {
      const createOne = this.userRepo.create({email : createUserDto.email, password : hashpassword})
      return this.userRepo.save(createOne)
    }
    const createwithRole = this.userRepo.create({email : createUserDto.email, password : hashpassword, role : createUserDto.role})
    if(createwithRole.role == "service_eng" || createwithRole.role == "stock_inc" || createwithRole.role == "admin"){
      const saveData = await this.userRepo.save(createwithRole)
      return saveData
    }
    else{
      throw new BadRequestException()
    }
  }


  async signin(createUserDto : CreateUserDto){
    const getOne = await this.userRepo.findOne({where : {email : createUserDto.email}})
    if(!getOne) throw new BadRequestException("Wrong input") 
    const hashedpassword = argon2.verify(getOne.password, createUserDto.password)
    if(!hashedpassword) throw new BadRequestException("Wrong input..")
    const token = sign({email : createUserDto.email}, 'secret', {expiresIn : '30d'})
    return {token : token}
  }
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    console.log(moment().format()) //2022-10-19T12:11:40+05:30
    const data = moment().format('MMMM Do YYYY, h:mm:ss a') 
    console.log(data); // October 19th 2022, 12:11:40 pm
    return data;
  }
 
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
