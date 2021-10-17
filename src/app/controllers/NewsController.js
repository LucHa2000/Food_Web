const multer = require('multer');
const upload = multer({
    dest: 'src/public/uploads/'
});

const Article = require('../models/Article');
const List = require('../models/List');
const {
    mutipleMongooseToObject
} = require('../../util/mongoose');
const {
    mongooseToObject
} = require('../../util/mongoose');

class NewsController {
    index(req, res, next) {
        Article.find({})
            .then((articles) => {
                res.render('user/news_view', {
                    articles: mutipleMongooseToObject(articles)
                })
            })

    }
    newsDetail(req, res, next) {
        let queryNewsDetail = Article.findById(req.params.id)
        let queryNews = Article.find({})
        Promise.all([queryNewsDetail, queryNews]).then(
            ([queryNewsDetail, queryNews]) => {
                res.render('user/article-detail', {
                    article: mongooseToObject(queryNewsDetail),
                    articles: mutipleMongooseToObject(queryNews.slice(0, 2)),
                }, );

            })

    }

}


module.exports = new NewsController();