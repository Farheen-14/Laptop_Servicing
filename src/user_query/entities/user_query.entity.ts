import { User } from "src/user/entities/user.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Repair_Type } from "./repairtype.enum"

@Entity()
export class UserQuery {
    @PrimaryGeneratedColumn('uuid')
    query_id : string

    @Column()
    company_name : string
    
    @Column()
    model_no : string
    
    @Column()
    serial_no : string
   
    @Column({type : 'enum', enum : Repair_Type})
    select_repair : Repair_Type
    
    @Column()
    description_of_problem : string
    
    @Column({default : true})
    status : boolean
    // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    // complain_date : Date

    @ManyToOne(() => User , user => user.query, {cascade : true , eager : true})
    user : User
}
