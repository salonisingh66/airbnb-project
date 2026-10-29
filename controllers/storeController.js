const Home = require("../models/home");

const registeredHomes =
Home.registeredHomes;

const Favourites = require('../models/favourite');
//const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
   Home.fetchAll((registeredHomes) => 
     res.render('store/index', {
    registeredHomes: registeredHomes, 
    pageTitle: 'airbnb Home',
    currentPage: 'index',
  })
);
 
};


exports.getHomes = (req, res, next) => {
   Home.fetchAll((registeredHomes) => 
     res.render('store/home-list', {
    registeredHomes: registeredHomes, 
    pageTitle: 'Homes List',
    currentPage: 'Home',
  })
   );
 
};





exports.getBookings = (req, res, next) => {
     res.render('store/bookings', {
    pageTitle: 'My Bookings',
    currentPage: 'bookings',
  })
  
  };



exports.getFavouriteList = (req, res, next) => {
    
    Favourites.getFavourites((favourites) => {
        
        Home.fetchAll((registeredHomes) => {
            
            const favouriteHomes = registeredHomes.filter(home => 
                favourites.includes(home.id)
            );

            res.render('store/favourite-list', {
                favouriteHomes: favouriteHomes,
                pageTitle: 'My Favourites',
                currentPage: 'favourites',
            });
        });
    });
};





exports.postAddToFavourite = (req, res, next) => {
Favourites.addToFavourite(req.body.id, error => {
  if(error){
    console.log("Error while marking favourite", error);
  } 
  res.redirect("/favourites");

})

}

exports.postRemoveFromFavourite = (req, res, next) => {
    const homeId = req.params.homeId;
    Favourites.deleteById(homeId, error => { 
        if (error) {
            console.log('Error while removing from Favourite', error);
        }
        res.redirect("/favourites");
    });
};


exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
 

  Home.fetchAll((registeredHomes) => {
    Home.findById(homeId, (home) => { 
      if (!home) {
        console.log("Home not found")
        res.redirect("/homes");
      } else{

    
     
      res.render("store/home-detail", {
        home: home,
        registeredHomes: registeredHomes,
        pageTitle: "Home Detail",
        currentPage: "Home",
      }); 
    }
      
    }); 
  }); 
}; 





