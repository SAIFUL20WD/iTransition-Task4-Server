import { z } from "zod";

const createUserValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, { message: "Name must must be minimum 3 characters" })
        .max(20, { message: "Name can not be more than 20 characters" }),
    company: z.string().max(50, { message: "Comapny can not be more than 50 characters" }).optional(),
    email: z.string().email(),
    password: z
        .string()
        .min(1, { message: "Password must be minimum 1 characters" })
        .max(20, { message: "Password can not be more than 20 characters" }),
});

const updateUserValidationSchema = z.object({
    name: z
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
    password: z
        .string()
        .min(1, { message: "Password must be minimum 1 characters" })
        .max(20, { message: "Password can not be more than 20 characters" })
        .optional(),
    lastLogin: z.string().optional(),
    status: z.enum(["blocked", "ok"]).optional(),
});

export const userValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
