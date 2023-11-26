const express = require("express");
const chackAuth = require("../middleware/checkAuth.js");
// model samochodu
const Vinyl = require("../models/vinyl.js");
// wyciągam router
const router = express.Router();
const VinylController = require("../controllers/vinyl.js");

router.get("/", chackAuth, VinylController.vinyls_get_all);

router.post("/", chackAuth, VinylController.vinyls_add_new);

router.get("/:id", VinylController.vinyls_get_by_id);

router.put("/:id", chackAuth, VinylController.vinyls_change);

router.delete("/:id", chackAuth, VinylController.vinyls_delete);

module.exports = router;
