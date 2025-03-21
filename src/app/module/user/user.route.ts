import express from "express";
import auth from "../../middleware/auth";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.get("/", auth(), UserControllers.getAllUsers);

router.get("/me", auth(), UserControllers.getUser);

router.put("/update-status", auth(), UserControllers.updateStatus);

router.patch("/update-last-seen", auth(), UserControllers.updateLastSeen);

router.delete("/", auth(), UserControllers.deleteUsers);

export const UserRoutes = router;
