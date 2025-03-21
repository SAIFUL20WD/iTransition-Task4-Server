"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    if (data.token) {
        res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
            success: data.success,
            message: data.message,
            token: data.token,
            data: data.data,
        });
    }
    else if (Array.isArray(data.data) && data.data.length === 0) {
        res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
            success: false,
            message: "No data found",
            data: [],
        });
    }
    else {
        res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
            success: data.success,
            message: data.message,
            data: data.data,
        });
    }
};
exports.default = sendResponse;
