const express = require("express");
const transferController = require("../controllers/transferController");
const {
  authenticateJWT,
  authorizeRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create",
  authenticateJWT,
  authorizeRole("maker"),
  transferController.createTransferRequest
);


router.get(
  "/transfer-list",
  authenticateJWT,
  authorizeRole("maker"),
  transferController.getTransferList
);

module.exports = router;
