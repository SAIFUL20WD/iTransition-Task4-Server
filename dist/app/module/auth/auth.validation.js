"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(1, { message: "Password must be minimum 1 characters" })
        .max(20, { message: "Password can not be more than 20 characters" }),
});
exports.default = loginValidationSchema;
