import { z } from "zod";

const loginValidationSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(1, { message: "Password must be minimum 1 characters" })
        .max(20, { message: "Password can not be more than 20 characters" }),
});

export default loginValidationSchema;
