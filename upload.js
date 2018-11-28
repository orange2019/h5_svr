const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const moment = require('moment') 
const uuid = require('uuid')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = path.join(__dirname, './uploads/images' , moment(new Date()).format('YYYYMMDD'))
    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest)
    }
    cb(null,  dest)
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname.split('.')
    let ext = originalname[originalname.length - 1]
    let filename = uuid.v4() + '.' + ext
    cb(null, filename)
  }
})

let upload = multer({
  // dest: path.join(__dirname, './../../uploads/images'),
  storage: storage
}).any()

router.post('/', async (req, res) => {

  upload(req, res, (err) => {
    if(err){
      console.log(err)
      return res.json({error:1, message: '上传失败'})
    }

    console.log(req.files)
    let filePath = path.join('/uploads/images/' , moment(new Date()).format('YYYYMMDD') , req.files[0].filename)
    return res.json({error:0, url: filePath})
    // 
  })

  // res.send('success')

})


module.exports = router