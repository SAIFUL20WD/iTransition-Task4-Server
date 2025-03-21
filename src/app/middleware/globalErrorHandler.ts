import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import AppError from "../errors/AppError";
import { ValidationError as SequelizeValidationError, UniqueConstraintError, DatabaseError } from "sequelize";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something Went Wromg!";

    let errorSources: TErrorSources = [
        {
            path: "",
            message: "Something Went Wromg!",
        },
    ];

    if (err instanceof SequelizeValidationError) {
        statusCode = 400;
        // message = "Validation error(s) occurred.";
        errorSources = err.errors.map((e) => {
            message = e.message;
            return {
                path: e.path || "",
                message: e.message || "Invalid value",
            };
        });
    } else if (err instanceof UniqueConstraintError) {
        statusCode = 409;
        message = "Unique constraint violation.";
        errorSources = [
            {
                path: err.fields ? Object.keys(err.fields).join(", ") : "",
                message: "Unique constraint error",
            },
        ];
    } else if (err instanceof DatabaseError) {
        statusCode = 500;
        message = "Database error occurred.";
        errorSources = [
            {
                path: "",
                message: err.message || "Database error",
            },
        ];
    } else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources: errorSources,
        stack: config.nodeEnv === "development" ? err?.stack : null,
    });
};

export default globalErrorHandler;
