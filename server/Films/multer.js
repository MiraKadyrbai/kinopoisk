const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/films')
    },
    filename: function(req, file, cb){
        //myimg.jpg
        let ext = file.originalname.split(".")
        ext = ext[ext.length - 1]
        //8e8776768865578.jpg
        const unique = Date.now() + '.' + ext
        cb(null, unique)
    }
})

const upload = multer({storage})
module.exports = {upload}