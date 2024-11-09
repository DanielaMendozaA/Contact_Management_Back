import { SetMetadata } from '@nestjs/common';
import { ContactCategoryEnum } from 'src/common/enums/category.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ContactCategoryEnum[]) => SetMetadata(ROLES_KEY, roles);