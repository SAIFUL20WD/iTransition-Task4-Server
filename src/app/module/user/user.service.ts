import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import User from "./user.model";

const getAllUsersFromDB = async () => {
    const user = await User.findAll();
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Users not found");
    }
    return user;
};

const getUserFromDB = async (email: string) => {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
};

const updateUserStatusIntoDB = async (userIds: number[], status: "blocked" | "ok") => {
    const user = await User.update({ status: status }, { where: { id: userIds } });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Users not found");
    }
    return user;
};

const updateUserLastSeenIntoDB = async (email: string, payLoad: { data: string }) => {
    const user = await User.update({ lastSeen: new Date(payLoad.data) }, { where: { email: email } });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
};

const deleteUsersFromDB = async (userIds: number[]) => {
    const user = await User.destroy({ where: { id: userIds } });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Users not found");
    }
    return user;
};

export const UserServices = {
    getAllUsersFromDB,
    getUserFromDB,
    updateUserLastSeenIntoDB,
    updateUserStatusIntoDB,
    deleteUsersFromDB,
};
