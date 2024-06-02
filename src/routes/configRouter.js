const express = require("express");
const {
  getAllConfigs,
  addConfig,
  updateConfig,
  deleteConfig,
} = require("../controllers/configController");
const checkAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", checkAuth, getAllConfigs);
router.post("/", checkAuth, addConfig);
router.put("/:id", checkAuth, updateConfig);
router.delete("/:id", checkAuth, deleteConfig);

module.exports = router;
