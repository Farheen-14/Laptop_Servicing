import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req, BadRequestException } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { AuthGuard } from 'src/guard/authGuard';
import { StockInc } from 'src/guard/stockGuard';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(StockInc)
  @UseGuards(AuthGuard)
  @Post('/addStock')
  create(@Body() createStockDto: CreateStockDto, @Req() req : any) {
    const user = req.user
    const {id, role} = user
    const curuser = {id,role}
    return this.stockService.addStock(createStockDto,curuser);
  }

  @UseGuards(StockInc)
  @UseGuards(AuthGuard)
  @Get('/allstock')
  findAll( @Req() req : any) {
    const user = req.user
    const {id, role} = user
    const curuser = {id,role}
    return this.stockService.findAll(curuser);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @UseGuards(StockInc)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto, @Req() req : any) {
    const user = req.user    
    console.log(id, typeof(id));
    
    return this.stockService.update(id, updateStockDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
function UseGuard() {
  throw new Error('Function not implemented.');
}

