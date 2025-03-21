import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import createToken from "./auth.util";
import config from "../../config";

const signUpUser = async (payLoad: TUser) => {
    const user = await User.create(payLoad);
    return user;
};

const LoginUser = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "No user exists with given email");
    }
    // @ts-expect-error user has status field
    if (user?.status === "blocked") {
        throw new AppError(httpStatus.FORBIDDEN, "You are blocked!");
    }
    // @ts-expect-error user has password field
    const passwordMatched = await bcrypt.compare(password, user?.password);
    if (!passwordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password does not match!");
    }
    // @ts-expect-error user has password, status field
    const jwtPayload = { email: user?.email, status: user?.status };

    const token = createToken(jwtPayload, config.jwtSecretKey as string, config.jwtExpiresIn as string);
    // @ts-expect-error user has password field
    user?.password = "";

    return { user, token };
};

export const AuthServices = {
    signUpUser,
    LoginUser,
};
