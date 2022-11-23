import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    model_no : number

    @Column()
    part_name : string

    @Column('simple-array')
    qty : []

    @Column()
    price : number

    @Column({default : true})
    isAvailable : Boolean

    @ManyToOne(() => User , user => user.stock, {cascade : true , eager : true})
    user : User
}