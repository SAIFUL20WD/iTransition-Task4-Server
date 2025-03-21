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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_util_1 = __importDefault(require("./auth.util"));
const config_1 = __importDefault(require("../../config"));
const signUpUser = (payLoad) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(payLoad);
    return user;
});
const LoginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ where: { email: email } });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No user exists with given email");
    }
    // @ts-expect-error user has status field
    if ((user === null || user === void 0 ? void 0 : user.status) === "blocked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are blocked!");
    }
    // @ts-expect-error user has password field
    const passwordMatched = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!passwordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match!");
    }
    // @ts-expect-error user has password, status field
    const jwtPayload = { email: user === null || user === void 0 ? void 0 : user.email, status: user === null || user === void 0 ? void 0 : user.status };
    const token = (0, auth_util_1.default)(jwtPayload, config_1.default.jwtSecretKey, config_1.default.jwtExpiresIn);
    // @ts-expect-error user has password field
    user === null || user === void 0 ? void 0 : user.password = "";
    return { user, token };
});
exports.AuthServices = {
    signUpUser,
    LoginUser,
};
