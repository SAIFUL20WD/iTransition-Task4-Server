import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import User from "../module/user/user.model";
import { Model } from "sequelize";
import { TUser } from "../module/user/user.interface";

const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        const decoded = jwt.verify(token, config.jwtSecretKey as string) as JwtPayload;

        req.user = decoded as JwtPayload;

        const { email } = req.user;

        const user: Model<TUser> | null = await User.findOne({ where: { email: email } });
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found or deleted");
        }
        if (user?.status === "blocked") {
            throw new AppError(httpStatus.FORBIDDEN, "You are blocked!");
        }

        next();
    });
};

export default auth;
