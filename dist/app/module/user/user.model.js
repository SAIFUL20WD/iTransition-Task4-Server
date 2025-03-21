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
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
const config_1 = __importDefault(require("../../config"));
const User = database_1.default.define("User", {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "N/A",
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastSeen: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date(),
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("blocked", "ok"),
        defaultValue: "ok",
    },
}, {
    indexes: [{ unique: true, fields: ["email"] }],
    tableName: "users",
});
User.beforeCreate((user) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error user has password field
    const hashedPassword = yield bcrypt_1.default.hash(user === null || user === void 0 ? void 0 : user.password, Number(config_1.default.saltRound));
    // @ts-expect-error user has password field
    user === null || user === void 0 ? void 0 : user.password = hashedPassword;
}));
exports.default = User;
