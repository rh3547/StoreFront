var express = require('express');
var router = express.Router();

/* GET entire FoodType list  */
router.get('/types', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodType');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET single FoodType by _id */
router.get('/types/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodType');
    var foodId = req.params.id;

    collection.find({'_id' : foodId}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET entire FoodSize list  */
router.get('/sizes', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodSize');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET all FoodSize by FoodTypeId  */
router.get('/sizes/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodSize');
    var foodId = req.params.id;

    collection.find({'FoodTypeId' : foodId}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET entire FoodOptionGroup list  */
router.get('/optiongroups', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodOptionGroup');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET all FoodOptionGroup by FoodTypeId  */
router.get('/optiongroups/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodOptionGroup');
    var foodId = req.params.id;

    collection.find({'FoodTypeId' : foodId}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET entire FoodOption list  */
router.get('/options', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodOption');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET all FoodOption by FoodOptionGroupId  */
router.get('/options/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('FoodOption');
    var groupId = req.params.id;

    collection.find({'FoodOptionGroupId' : groupId}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

function setHeaders(res) {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Content-Type", "application/json");
}

module.exports = router;
