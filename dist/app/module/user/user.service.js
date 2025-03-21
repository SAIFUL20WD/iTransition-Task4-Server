"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("./user.model"));
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findAll();
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Users not found");
    }
    return user;
});
const getUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ where: { email: email } });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
const updateUserStatusIntoDB = (userIds, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.update({ status: status }, { where: { id: userIds } });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Users not found");
    }
    return user;
});
const updateUserLastSeenIntoDB = (email, payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.update({ lastSeen: new Date(payLoad.data) }, { where: { email: email } });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
const deleteUsersFromDB = (userIds) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.destroy({ where: { id: userIds } });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Users not found");
    }
    return user;
});
exports.UserServices = {
    getAllUsersFromDB,
    getUserFromDB,
    updateUserLastSeenIntoDB,
    updateUserStatusIntoDB,
    deleteUsersFromDB,
};
