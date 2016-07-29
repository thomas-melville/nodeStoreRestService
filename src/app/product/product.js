var assert = require('assert');

var findDocuments = function(fields, collection, callback){
  collection.find(fields).toArray(function(err,docs){
    assert.equal(null,err);
    callback(docs);
  })
};

var check = function(err, message){
  assert.equal(null, err);
  console.log(message);
};

module.exports.getAll = function(req, res){
    var collections = db.collection("products");
    findDocuments({}, collections, function(result){
      res.status(200);
      res.send(result);
    });
};

module.exports.get = function(req, res){
    var model = req.params.model;
    var collections = db.collection("products");
    findDocuments({model:model},collections, function(result){
      res.status(200);
      res.send(result);
    });
};

module.exports.post = function(req, res){
    var product = {
      manufacturer:req.body.manufacturer,
      model:req.body.model,
      desc:req.body.desc,
      price:req.body.price,
      category:req.body.category};
    var collections = db.collection("products");
    collections.insert(product, function(err, result){
      assert.equal(null, err);
      res.status(201);
      res.send("Product created in database");
      });
};

module.exports.put = function(req, res){
    var model = req.params.model;
    var collections = db.collection("products");
    var product = {
      manufacturer:req.body.manufacturer,
      model:model,
      desc:req.body.desc,
            price:req.body.price,
            category:req.body.category};
    collections.update({model:model}, product, {upsert:true}, function(err, result){
      assert.equal(null, err);
      res.status(204);
      res.send("Product successfully updated");
    });
};

module.exports.delete = function(req, res){
    var model = req.params.model;
    var collections = db.collection("products");
    collections.remove({model:model}, function(err, result){
      assert.equal(null, err);
      res.status(204);
      res.send("Product deleted successfully");
    });
};