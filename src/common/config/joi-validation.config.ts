import * as Joi from 'joi'

export const JoiValidation = Joi.object({
    PORT: Joi.number().required(),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    EXECUTE_SEEDS: Joi.boolean().required(),
    JWT_SECRET: Joi.string().required(),
    // REDIS_HOST: Joi.string().required(),
    // REDIS_PORT: Joi.number().required(),
    CLOUDINARY_CLOUD_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY: Joi.string().required(),
    CLOUDINARY_API_SECRET: Joi.string().required()
});
