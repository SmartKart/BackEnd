var async = require('async');

// Require the driver.
var pg = require('pg');

// Connect to the "shoppingCart" database.
var config = {
  user: 'maxroach',
  host: 'localhost',
  database: 'shoppingCart',
  port: 26257
};


pg.connect(config, function (err, client, done) {
  // Closes communication with the database and exits.
  var finish = function () {
    done();
    process.exit();
  };

  if (err) {
    console.error('could not connect to cockroachdb', err);
    finish();
  }
  async.waterfall([
    function (next) {
      // Create the "cart" table.
      client.query("CREATE TABLE IF NOT EXISTS cart (id INT PRIMARY KEY, lat INT, long INT);");
      client.query("CREATE TABLE IF NOT EXISTS store (id INT PRIMARY KEY, name TEXT, price DECIMAL(8,2), percentOff INT, isOnSale BOOLEAN, type TEXT, image TEXT);");
      client.query("CREATE TABLE IF NOT EXISTS cartItems (id INT PRIMARY KEY, cart INT, barcode INT, name TEXT, price DECIMAL(8,2), percentOff INT, isOnSale BOOLEAN, type TEXT, image TEXT);", next);
    },
    function (next) {
      // Insert two rows into the "cart" table.
      client.query("INSERT INTO cart (id, lat, long) VALUES (1, 0, 0);");
    },
    function (results, next) {
      // Print out the balances.
      client.query('SELECT id, lat, long FROM cart;', next);
    },
  ],
  function (err, results) {
    if (err) {
      console.error('error inserting into and selecting from cart', err);
      finish();
    }

    console.log('Initial balances:');
    results.rows.forEach(function (row) {
      console.log(row);
    });

    finish();
  });
});