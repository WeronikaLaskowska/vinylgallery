const express = require("express");
const chackAuth = require("../middleware/checkAuth.js");
// model samochodu
const Car = require("../models/car.js");
// wyciągam router
const router = express.Router();
const CarsController = require("../controllers/cars.js");

router.get("/", chackAuth, CarsController.cars_get_all);

router.post("/", chackAuth, CarsController.cars_add_new);

router.get("/:id", CarsController.cars_get_by_id);

router.put("/:id", chackAuth, CarsController.cars_change);

router.delete("/:id", chackAuth, CarsController.cars_delete);

module.exports = router;
