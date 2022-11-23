import { Stock } from "src/stock/entities/stock.entity";
import { UserQuery } from "src/user_query/entities/user_query.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    email : string

    @Column()
    password : string

    @Column({type : 'enum', enum : Role, default : Role.User})
    // @Column({type : 'enum', enum : Role})
    role : Role

    @OneToMany(type => Stock, stock => stock.user )
    stock : Stock[]

    @OneToMany(type => UserQuery, query => query.user )
    query : UserQuery[]
}
