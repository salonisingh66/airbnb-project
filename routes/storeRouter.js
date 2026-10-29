

// External Module
const express = require('express');
const storeRouter = express.Router();

//local module
const homesController = require("../controllers/storeController");

storeRouter.get("/", homesController.getIndex);
storeRouter.get("/homes", homesController.getHomes)
storeRouter.get("/bookings", homesController.getBookings);
storeRouter.get("/favourites", homesController.getFavouriteList);

storeRouter.post("/favourites", homesController.postAddToFavourite);

storeRouter.post("/favourites/delete/:homeId", homesController.postRemoveFromFavourite);

storeRouter.get("/homes/:homeId", homesController.getHomesDetails);





module.exports = storeRouter;