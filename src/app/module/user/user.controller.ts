import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});

const getUser = catchAsync(async (req, res) => {
    const { email } = req.user;
    const result = await UserServices.getUserFromDB(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile retrieved successfully",
        data: result,
    });
});

const updateStatus = catchAsync(async (req, res) => {
    const userIds = req.body;
    const status = req?.query?.status === "block" ? "blocked" : "ok";
    const result = await UserServices.updateUserStatusIntoDB(userIds, status);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Selected user ${status === "ok" ? "unblocked" : status} successfully`,
        data: result,
    });
});

const updateLastSeen = catchAsync(async (req, res) => {
    const { email } = req.user;
    const result = await UserServices.updateUserLastSeenIntoDB(email, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Last seen updated successfully",
        data: result,
    });
});

const deleteUsers = catchAsync(async (req, res) => {
    const userIds = req.body;
    const result = await UserServices.deleteUsersFromDB(userIds);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Selected user deleted successfully",
        data: result,
    });
});

export const UserControllers = {
    getAllUsers,
    getUser,
    updateStatus,
    updateLastSeen,
    deleteUsers,
};
