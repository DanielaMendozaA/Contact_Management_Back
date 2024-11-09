import { applyDecorators, Type } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation } from "@nestjs/swagger";

import { ApiBadRequest, ApiCreated, ApiSuccessResponses, ApiSuccessResponsesArray, ApiUnauthorized } from "src/common/decorators/swagger.decorator";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Entity } from 'typeorm';
import { LoginUserDto } from "../dto/login-user.dto";

export function ApiDocRegisterUser <T>(entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Register a new user',
            description: 'This endpoint allows to create a new user'
        }),
        ApiBody({
            type: CreateUserDto
        }),
        ApiCreated(entity),
        ApiBadRequest()
    )
}

export function ApiDocLoginUser <T> (entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Login the user',
            description: 'This endpoint allows to login a user'
        }),
        ApiBody({
            type: LoginUserDto
        }),
        ApiSuccessResponses(entity),
        ApiUnauthorized()
    )
}

