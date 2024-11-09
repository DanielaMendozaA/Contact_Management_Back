import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";

import { ApiBearerAuth } from "@nestjs/swagger";
import { ContactCategoryEnum } from "src/common/enums/category.enum";
import { JwtGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";

export const ROLES_KEY = 'roles';

export function VerifyAuthService(roles: ContactCategoryEnum[]){
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(JwtGuard, RolesGuard),
        ApiBearerAuth('access-token')
    );
}


// export const Roles = (...roles: UserRoleEnum[]) => SetMetadata(ROLES_KEY, roles);