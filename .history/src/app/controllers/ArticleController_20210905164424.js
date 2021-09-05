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
    articleUpdate(req,res,next){
        if (req.file) {
            req.body.image = req.file.path.split('\\').slice(3).join();
          } else {
            req.body.image = req.body.img_old;
          }
      
          Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin'))
            .catch(next);
    }
    postNews(req,res,next){
        req.body.image = req.file.path.split('\\').slice(3).join();
        req.body.article_status = 1
        req.body.author = req.cookies.userName
        var newArticle = Article (req.body)
        newArticle.save()
        res.redirect('back')
    }
}
module.exports = new ArticleController();
