import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserQueryService } from './user_query.service';
import { CreateUserQueryDto } from './dto/create-user_query.dto';
import { UpdateUserQueryDto } from './dto/update-user_query.dto';
import { AuthGuard } from 'src/guard/authGuard';
import { UserGuard } from 'src/guard/userGuard';
import { EngineerGuard } from 'src/guard/engineerGuard';

@Controller('user-query')
export class UserQueryController {
  constructor(private readonly userQueryService: UserQueryService) {}

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Post('/postQuery')
  post(@Body() createUserQueryDto: CreateUserQueryDto, @Req() req: any) { 
    const user = req.user 
    return this.userQueryService.postQuery(createUserQueryDto, user);
  }

  // @UseGuards(EngineerGuard)
  // @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get('/getAllQuery')
  findAll(@Req() req:any) {
    const user = req.user
    return this.userQueryService.findAll(user);
  }


  @UseGuards(EngineerGuard)
  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string, @Req() req : any) {
    const user = req.user
    return this.userQueryService.findOne(id, user);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserQueryDto: UpdateUserQueryDto, @Req() req:any) {
    const user = req.user
    return this.userQueryService.update(id, updateUserQueryDto,user);
  }

  @UseGuards(UserGuard)
  @UseGuards(AuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req:any) {
    const user = req.user
    return this.userQueryService.remove(id,user);
  }
}
