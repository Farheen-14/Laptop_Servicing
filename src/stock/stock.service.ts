import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/user/entities/role.enum';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(@InjectRepository(User) private readonly userRepo : Repository<User>,
  @InjectRepository(Stock) private readonly stockRepo : Repository<Stock>
  ){}

  async addStock(createStockDto: CreateStockDto, curuser) {
    const getUser = await this.userRepo.findOne({where : {id : curuser.id}})
    if(getUser.role != 'stock_inc') throw new UnauthorizedException()
    const createStock = this.stockRepo.create(createStockDto)
    createStock.user = curuser
    await this.stockRepo.save(createStock)
    return createStock;
  }

  async findAll(curuser) {
    const getUser = await this.userRepo.findOne({where : {id : curuser.id}})
    if(getUser.role != 'stock_inc') throw new UnauthorizedException()
    return this.stockRepo.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  async update(id: string, updateStockDto: UpdateStockDto, curuser) {  
    const getStock= await this.stockRepo.findOne({where : {id : id}})
    if(getStock.user.id != curuser.id) throw new UnauthorizedException()
    Object.assign(getStock,updateStockDto)
    const data = await this.stockRepo.save(getStock)
    return data
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
