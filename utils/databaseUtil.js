const mysql = require('mysql2');
const pool = mysql.createPool({
host: 'localhost',
user:  'airbnb_user',
password: 'Airbnb@12345',
database: 'airbnb'

});
module.exports = pool.promise();
