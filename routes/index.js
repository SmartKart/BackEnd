var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgresql://root@localhost:26257/shoppingCart'

// THIS IS FOR CART DB
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/v1/carts', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {id: req.body.id, lat: 0, long: 0};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO cart(id, lat, long) values($1, $2, $3)',
    [data.id, data.lat, data.long]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cart ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


router.get('/api/v1/carts', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cart ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/v1/carts/:cart_id', (req, res, next) => {
  const results = [];
  const id = req.params.cart_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cart WHERE id=($1)',
    	[id]);
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/v1/carts/:cart_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.cart_id;
  // Grab data from http request
  const data = {lat: req.body.lat, long: req.body.long};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE cart SET lat=($1), long=($2) WHERE id=($3)',
    [data.lat, data.long, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM cart ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/carts/:cart_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.cart_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM cart WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM cart ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});






// THIS IS FOR STORE DB
router.post('/api/v1/store', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {id: req.body.id, name: req.body.name, price: req.body.price, percentOff: req.body.percentOff, isOnSale: req.body.isOnSale, type:req.body.type, image:req.body.image };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO store(id, name, price, percentOff, isOnSale, type, image) values($1, $2, $3, $4, $5, $6, $7)',
    [data.id, data.name, data.price, data.percentOff, data.isOnSale, data.type, data.image]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM store ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/v1/store', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM store ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/v1/store/:item_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.item_id;
  // Grab data from http request
  const data = {name: req.body.name, price: req.body.price, percentOff: req.body.percentOff, isOnSale: req.body.isOnSale, type:req.body.type, image: req.body.image};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE store SET name=($1), price=($2), percentOff=($3), isOnSale=($4), type=($5), image=($6) WHERE id=($7)',
    [data.name, data.price, data.percentOff, data.isOnSale, data.type, data.image, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM store ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/store/:item_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.item_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM store WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM store ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});




//cart code
// THIS IS FOR STORE DB
router.post('/api/v1/cartItems', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {id: req.body.id, cart: req.body.cart, barcode: req.body.barcode, name: req.body.name, price: req.body.price, percentOff: req.body.percentOff, isOnSale: req.body.isOnSale, type:req.body.type, image:req.body.image };
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO cartItems (id, cart, barcode, name, price, percentOff, isOnSale, type, image) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [data.id, data.cart, data.barcode, data.name, data.price, data.percentOff, data.isOnSale, data.type, data.image]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cartItems ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.get('/api/v1/cartItems', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM cartItems ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

router.put('/api/v1/cartItems/:item_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.item_id;
  // Grab data from http request
  const data = {cart: req.body.cart, barcode: req.body.barcode, name: req.body.name, price: req.body.price, percentOff: req.body.percentOff, isOnSale: req.body.isOnSale, type:req.body.type, image: req.body.image};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Update Data
    client.query('UPDATE cartItems SET cart=($1), barcode=($2), name=($3), price=($4), percentOff=($5), isOnSale=($6), type=($7), image=($8) WHERE id=($9)',
    [data.cart, data.barcode, data.name, data.price, data.percentOff, data.isOnSale, data.type, data.image, id]);
    // SQL Query > Select Data
    const query = client.query("SELECT * FROM cartItems ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

router.delete('/api/v1/cartItems/:item_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.item_id;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM cartItems WHERE id=($1)', [id]);
    // SQL Query > Select Data
    var query = client.query('SELECT * FROM cartItems ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;