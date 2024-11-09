import { applyDecorators, Type } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery } from "@nestjs/swagger";
import { 
    ApiForbidden, 
    ApiNotFound, 
    ApiSuccessResponses, 
    ApiSuccessResponsesArray, 
    ApiUnauthorized 
} from "src/common/decorators/swagger.decorator";

export function ApiDocGetAllContacts<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Get all contacts',
            description: 'This endpoint allows to get all contacts with optional query parameters for filtering'
        }),
        ApiQuery({
            name: 'name',
            required: false,
            type: String,
            description: 'Filter by contact name'
        }),
        ApiQuery({
            name: 'phone',
            required: false,
            type: String,
            description: 'Filter by contact phone number'
        }),
        ApiSuccessResponsesArray(entity),
        ApiUnauthorized()
    );
}

export function ApiDocGetContactById<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Get contact by term',
            description: 'This endpoint allows to get a contact by username, email, or ID'
        }),
        ApiParam({
            name: 'term',
            required: true,
            type: String,
            description: 'username, email, or ID'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiUnauthorized()
    );
}

export function ApiDocCreateContact<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Create a new contact',
            description: 'This endpoint allows to create a new contact'
        }),
        ApiSuccessResponses(entity),
        ApiUnauthorized(),
        ApiForbidden()
    );
}

export function ApiDocEditContact<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Edit an existing contact',
            description: 'This endpoint allows to edit an existing contact by ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'ID of the contact to edit'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiUnauthorized(),
        ApiForbidden()
    );
}

export function ApiDocDeleteContact<T>(entity: Type<T>) {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete a contact',
            description: 'This endpoint allows to delete a contact by ID'
        }),
        ApiParam({
            name: 'id',
            required: true,
            type: Number,
            description: 'ID of the contact to delete'
        }),
        ApiSuccessResponses(entity),
        ApiNotFound(),
        ApiUnauthorized(),
        ApiForbidden()
    );
}

