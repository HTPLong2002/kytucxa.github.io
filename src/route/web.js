import express from "express";
import homecontroller from '../controller/homecontroller';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
const router = express.Router();//tạo 1 biến router 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("check approot: ", appRoot)
            cb(null, appRoot + "/src/public/image/");
    },
    filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const middle = express.urlencoded({
    extended: false,
})
let upload = multer({ storage: storage, fileFilter: imageFilter });

// let upload2 = multer({ storage: storage2, fileFilter: imageFilter2 });
var initwebRouter = function(app){
    router.get('/', homecontroller.getHomepage);

    router.get('/trang-chu/user/:Masv', middle,homecontroller.getsignup);
    router.post('/trang-chu/user/:Masv', middle,homecontroller.signup);
    
    router.get('/index_register', homecontroller.getdk);
    router.post('/creater-data', middle,homecontroller.creater);

    router.get('/quen-mat-khau', homecontroller.getforgot);
    router.post('/quen-mat-khau', middle,homecontroller.postforgot);

    router.get('/reset', homecontroller.showresetpassword);
    router.post('/reset',middle, homecontroller.postresetpassword);

    router.get('/trang-chu/user/:Masv/dang-ky-phong', homecontroller.getdangkyphong);
    router.post('/trang-chu/user/:Masv/dang-ky-phong',upload.array('image_CCCD', 2),homecontroller.postdangkyphong);
    // router.post('/upload-profile-pic',upload.array('profile_pic', 2), middle,homecontroller.posttest);
    router.get('/trang-chu/user/:Masv/dang-sach-phong', homecontroller.getdsphong);
    router.get('/trang-chu/user/:Masv/Thong-tin-dkphong', homecontroller.getduyetphong);

    router.get('/trang-chu/user/:Masv/thong-tin-sinh-vien',middle, homecontroller.getavatar);
    router.get('/image-CCCD/:Masv', homecontroller.showimage)

    router.get('/trang-chu/user/:Masv/duyet-don-swaproom', homecontroller.getduyetswaproom);

    router.get('/trang-chu/user/:Masv/dang-ky-chuyen-phong', homecontroller.getswaproom);
    router.post('/trang-chu/user/:Masv/dang-ky-chuyen-phong',upload.any(), homecontroller.postswaproom);
    // Dành cho quản lý

    router.get('/quan-ly/dang-nhap', middle,homecontroller.getHomepage2);

    router.get('/trang-chu/quan-ly/:Maql', middle,homecontroller.getsignup2);
    router.post('/trang-chu/quan-ly/:Maql',middle,homecontroller.signup2);

    router.get('/trang-chu/user/:Maql/danh-sach-don', middle,homecontroller.getduyetdondkphong);
    router.get('/trang-chu/user/:Maql/danh-sach-don-duoc-duyet', middle,homecontroller.getdsdaduyet);
    router.post('/trang-chu/user/:Maql/danh-sach-don', middle,homecontroller.postduyetdondkphong);
    
    return app.use('/',router)
}
export default initwebRouter;