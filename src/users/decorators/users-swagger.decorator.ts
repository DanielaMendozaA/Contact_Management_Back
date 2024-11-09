import { applyDecorators, Type } from "@nestjs/common"
import { ApiOperation, ApiBearerAuth, ApiParam } from "@nestjs/swagger"
import { ApiForbidden, ApiNotFound, ApiSuccessResponses, ApiSuccessResponsesArray, ApiUnauthorized } from "src/common/decorators/swagger.decorator"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

export function ApiDocGetAllUsers <T> (entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Get all users',
            description: 'This endpoint allows to get all users'
        }),
        ApiSuccessResponsesArray(entity),
        ApiUnauthorized(),
        ApiForbidden()
    )
}

export function ApiDocGetUserByTerm <T> (entity: Type<T>){
    return applyDecorators(
        ApiOperation({
            summary: 'Get user by term',
            description: 'This endpoint allows to get a user by  username, email or id'
        }),
        ApiParam({
            name: 'term',
            required: true,
            type: String,
            description: 'username, email, or id'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiUnauthorized(),
        ApiForbidden()
    )
}