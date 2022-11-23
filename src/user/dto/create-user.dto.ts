import { Role } from "../entities/role.enum"

export class CreateUserDto {
    email : string
    password : string
    role ?: Role
}
