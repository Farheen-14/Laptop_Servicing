    import { SetMetadata } from '@nestjs/common'

    import { Role } from "./role.enum";

    export const ROLES_KEY = 'roles'
    export const Roles = (...roles : Role[]) => SetMetadata(ROLES_KEY, roles) //we have a custom @Roles() decorator, we can use it to decorate any route handler.