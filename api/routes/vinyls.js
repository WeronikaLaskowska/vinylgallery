const express = require("express");
const multer = require("multer");
const path = require("path");
const chackAuth = require("../middleware/checkAuth.js");
const Vinyl = require("../models/vinyl.js");
const router = express.Router();
const VinylController = require("../controllers/vinyl.js");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // setting filename
  },
});

const upload = multer({ storage: storage });

router.get("/", VinylController.vinyls_get_all);
router.post(
  "/",
  chackAuth,
  upload.single("image"),
  VinylController.vinyls_add_new
);
router.get("/:id", VinylController.vinyls_get_by_id);
router.put(
  "/:id",
  chackAuth,
  upload.single("image"),
  VinylController.vinyls_change
);
router.delete("/:id", chackAuth, VinylController.vinyls_delete);

module.exports = router;
