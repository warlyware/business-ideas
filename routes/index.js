var express = require('express');
var flash = require('express-flash');
var router = express.Router();
var mongoose = require('mongoose');
var parameterize = require('parameterize');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

mongoose.connect(process.env.MONGO_URI);

var ideaSchema = new mongoose.Schema({
  email: String,
  name: String,
  group: String,
  problem: String,
  solution: String,
  cost: String,
  code: String
});

var Idea = mongoose.model('Idea', ideaSchema);

router.get('/', function(req, res) {
  res.render('index', { });
});

router.post('/hypothesis', function(req, res) {

  var titleCode = parameterize(req.body.name || req.body.group).substring(0,42);
  var idea = new Idea({
    email: req.body.email,
    name: req.body.name,
    group: req.body.group,
    problem: req.body.problem,
    why: req.body.why,
    solution: req.body.solution,
    cost: req.body.cost,
    code: ((new Date()).getTime()).toString() + "-" + titleCode
  });

  idea.save(function(err, idea) {
    if (err) {
      req.flash('danger', 'There was a problem');
      return console.error(err);
    }
    req.flash('success', 'Hypothesis saved');
    res.redirect('/hypothesis/' + idea.code);
  });

});

router.get('/hypothesis/:code', function(req, res) {
  Idea.findOne({ code: req.params.code }, function(err, idea) {
    if (err) {
      return console.error(err);
    }
    if (idea) {
      // res.render('idea', { idea: idea });
      res.json(idea);
    } else {
      res.redirect('/?i');
    }
  });
});

module.exports = router;
