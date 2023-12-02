const express = require("express");
const multer = require("multer");
const path = require("path");
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Set the filename for uploaded files
  },
});
const chackAuth = require("../middleware/checkAuth.js");
// model samochodu
const Vinyl = require("../models/vinyl.js");
// wyciągam router
const router = express.Router();
const VinylController = require("../controllers/vinyl.js");
const upload = multer({ storage: storage });
router.get("/", chackAuth, VinylController.vinyls_get_all);

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
