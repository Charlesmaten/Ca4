var wikiModel = require('./model/db').wikiModel;

var getWiki = function(title, done) {
  wikiModel.find({title: title}).exec(function(err, res) {
     if(err) done(err);

      else done(null, res);
  });
};

var getWikisWithCategory = function(category, done) {
    wikiModel.find({categories:category}).exec(function(err, res) {
        if (err) done(err);
        else {
            var  toReturn = [];
            for (var i in res) {
                toReturn.push({title: res[i].title, abstract: res[i].abstract})
            };
            done(null, toReturn)
        }
    });
};

var getCategories = function (done) {

    wikiModel.find().distinct('categories').exec(function(err, res){
        if (err) done(err)
        else
        done(null, res)
    });
};

var findWiki = function(searchString, done) {

    var results = [];

    wikiModel.find({title: new ReqExp(searchString, 'i')}).exec(function(err, res) {
        if (err) done(err)
        else {
            for (var i in res) {
                results.push({title: res[i].title, abstract: res[i].abstract});
            }
        };
        wikiModel.find({abstract: new ReqExp(searchString, 'i')}).exec(function(err, res) {
            if (err) done(err)
            else {
                for(var i in res) {
                    results.push({title: res[i].title, abstract: res[i].abstract});
                };
                done(null, results);
            }
        })
    })
}


exports.getWiki = getWiki;
exports.getWikisWithCategory = getWikisWithCategory;
exports.getCategories = getCategories;
exports.findWiki = findWiki;