var express = require('express');
var router = express.Router();

/* GET entire ItemType list  */
router.get('/types', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemType');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET single ItemType by _id */
router.get('/types/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemType');
    var itemId = req.params.id;

    collection.find({'_id' : itemId}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET entire ItemSize list  */
router.get('/sizes', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemSize');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET all ItemSize by ItemTypeId  */
router.get('/sizes/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemSize');
    var itemId = req.params.id;

    collection.find({'ItemTypeId' : itemId}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET entire ItemOptionGroup list  */
router.get('/optiongroups', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemOptionGroup');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET all ItemOptionGroup by ItemTypeId  */
router.get('/optiongroups/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemOptionGroup');
    var itemId = req.params.id;

    collection.find({'ItemTypeId' : itemId}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET entire ItemOption list  */
router.get('/options', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemOption');

    collection.find({}, {}, function(e, data) {
        setHeaders(res);
        res.json(data);
    });
});

/* GET all ItemOption by ItemOptionGroupId  */
router.get('/options/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('ItemOption');
    var groupId = req.params.id;

    collection.find({'ItemOptionGroupId' : groupId}, {}, function(e, data) {
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
