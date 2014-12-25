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

    wikiModel.find({title: new RegExp(searchString, 'i')}).exec(function(err, res) {
        if (err) done(err)
        else {
            for (var i in res) {
                results.push({title: res[i].title, abstract: res[i].abstract});
            }
        };
        wikiModel.find({abstract: new RegExp(searchString, 'i')}).exec(function(err, res) {
            if (err) done(err)
            else {
                for(var i in res) {
                    results.push({title: res[i].title, abstract: res[i].abstract});
                };
                done(null, results);
            };
        })
    })
};

var categoriesAndTitles = function (letter, done){

    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };

    var results = [];
    var myCats = [];
    wikiModel.find().exec(function (err, wikis) {
        if (err) done(err)

        else{
            wikiModel.find().distinct('categories').exec(function (err, categories) {
                if (err) done(err)
                else {
                    for (var i = 0; i < categories.length; i++) {
                        if(categories[i] !== null && categories[i].toUpperCase().startsWith(letter)) {
                            for (var j = 0; j < wikis.length; j++) {
                                for (var k = 0; k < wikis[j].categories.length; k++) {
                                    if (wikis[j].categories[k] === categories[i]) {
                                        myCats.push(wikis[j].title);
                                    }
                                }
                            }
                            results.push({category: categories[i], titles: myCats});
                        }
                        myCats = [];
                    }
                    done(null, results);
                }
            });
        }
    });
};

exports.getWiki = getWiki;
exports.getWikisWithCategory = getWikisWithCategory;
exports.getCategories = getCategories;
exports.findWiki = findWiki;
exports.categoriesAndTitles = categoriesAndTitles;