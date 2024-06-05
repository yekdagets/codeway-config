import express from "express";
import {
  getAllConfigs,
  getAllConfigsMobile,
  addConfig,
  updateConfig,
  deleteConfig,
} from "../controllers/configController.js";

import { checkIdToken, checkApiKey } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", checkApiKey, getAllConfigs);
router.get("/mobile", checkApiKey, getAllConfigsMobile);
router.post("/", checkIdToken, addConfig);
router.put("/:id", checkIdToken, updateConfig);
router.delete("/:id", checkIdToken, deleteConfig);

export default router;
