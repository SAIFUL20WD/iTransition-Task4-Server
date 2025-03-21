"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(3, { message: "Name must must be minimum 3 characters" })
        .max(20, { message: "Name can not be more than 20 characters" }),
    company: zod_1.z.string().max(30, { message: "Comapny can not be more than 20 characters" }).optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(1, { message: "Password must be minimum 1 characters" })
        .max(20, { message: "Password can not be more than 20 characters" }),
});
const updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(3, { message: "Name must must be minimum 3 characters" })
        .max(20, { message: "Name can not be more than 20 characters" })
        .optional(),
    // email: z
    //     .string()
    //     .email({ message: "Invalid email format" })
    //     .optional()
    //     .refine((email) => email === undefined, {
    //         message: "Email cannot be updated.",
    //         path: ["email"],
    //     }),
    password: zod_1.z
        .string()
        .min(1, { message: "Password must be minimum 1 characters" })
        .max(20, { message: "Password can not be more than 20 characters" })
        .optional(),
    lastLogin: zod_1.z.string().optional(),
    status: zod_1.z.enum(["blocked", "ok"]).optional(),
});
exports.userValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
