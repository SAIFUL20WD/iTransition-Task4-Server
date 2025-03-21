"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const sequelize_1 = require("sequelize");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something Went Wromg!";
    let errorSources = [
        {
            path: "",
            message: "Something Went Wromg!",
        },
    ];
    if (err instanceof sequelize_1.ValidationError) {
        statusCode = 400;
        // message = "Validation error(s) occurred.";
        errorSources = err.errors.map((e) => {
            message = e.message;
            return {
                path: e.path || "",
                message: e.message || "Invalid value",
            };
        });
    }
    else if (err instanceof sequelize_1.UniqueConstraintError) {
        statusCode = 409;
        message = "Unique constraint violation.";
        errorSources = [
            {
                path: err.fields ? Object.keys(err.fields).join(", ") : "",
                message: "Unique constraint error",
            },
        ];
    }
    else if (err instanceof sequelize_1.DatabaseError) {
        statusCode = 500;
        message = "Database error occurred.";
        errorSources = [
            {
                path: "",
                message: err.message || "Database error",
            },
        ];
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message: message,
        errorSources: errorSources,
        stack: config_1.default.nodeEnv === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
