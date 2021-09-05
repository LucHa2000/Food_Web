const multer = require('multer');
const upload = multer({ dest: 'src/public/uploads/' });
const Article = require('../models/Article')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class ArticleController {
    articleDelete ( req,res,next ) {
    Article.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('back');
    }
    ) 
    .catch(next)
}
    articleStatus(req,res,next){
        if (req.params.status == 1) {
            req.body.article_status = 0
          } else {
            req.body.article_status = 1
          }
        Article.updateOne({_id:req.params.id},req.body)
        .then((articles)=>res.redirect('back') )
        
        .catch(next)
    }
    articleUpdatePage(req,res,next){
            Article.findOne({_id : req.params.id})
            .then((articles)=>{
                res.render('admin/articleUpdate_view',{
                    articles: mongooseToObject(articles)
                })
            })
            .catch(next)
    }
    postNews(req,res,next){
        req.body.article_status = 1,
        author = res.cookies.userName,
        
    }
}
module.exports = new ArticleController();
