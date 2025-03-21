"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(), user_controller_1.UserControllers.getAllUsers);
router.get("/me", (0, auth_1.default)(), user_controller_1.UserControllers.getUser);
router.put("/update-status", (0, auth_1.default)(), user_controller_1.UserControllers.updateStatus);
router.patch("/update-last-seen", (0, auth_1.default)(), user_controller_1.UserControllers.updateLastSeen);
router.delete("/", (0, auth_1.default)(), user_controller_1.UserControllers.deleteUsers);
exports.UserRoutes = router;
