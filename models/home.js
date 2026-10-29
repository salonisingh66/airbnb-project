
//Core Module

const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils');
const { error } = require('console');




module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;

  }

save() {
  
  
Home.fetchAll((registeredHomes) => {
  if (this.id) {// edit home case
registeredHomes = registeredHomes.map(home => 
  home.id === this.id ? this : home)
  
  } else {//add home case
     this.id = Math.random().toString(); 

    registeredHomes.push(this);
  }

  
  const homeDataPath = path.join(rootDir, 'data',
    'homes.json');
    fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), error => {
      console.log("File Writing Concluded", error);
    });

});
}


static fetchAll(callback) {
  const homeDataPath = path.join(rootDir, 'data', 'homes.json');
  fs.readFile(homeDataPath, (err,data) => {
    callback(!err ? JSON.parse(data) : []);
    
  });

}

static findById(homeId, callback) { 
  const homeDataPath = path.join(rootDir, 'data', 'homes.json');

  this.fetchAll(homes => {
    const homeFound = homes.find(home => home.id == homeId);
    callback(homeFound);

  })
}




static deleteById(homeId, callback) { 
 const homeDataPath = path.join(rootDir, 'data', 'homes.json');

  this.fetchAll(homes => {
    homes = homes.filter(home => home.id !== homeId);
    fs.writeFile(homeDataPath, JSON.stringify(homes),
    callback);

  })
}

};

