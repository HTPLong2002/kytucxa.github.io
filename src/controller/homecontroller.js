import { render } from "ejs";
import pool from "../configs/connectsql";
import multer from 'multer';
import path from 'path';

let getHomepage =async function(req, res){
    //logic
    let Masv = req.body;
    let note = req.flash('note1')
    let note2 = req.flash('note2')
        return res.render('index.ejs', {note, note2,MSV: JSON.stringify(Masv)})
    }
let getHomepage2 =async function(req, res){
        //logic
        let Maql = req.body;
        let note = req.flash('note1')
        let note2 = req.flash('note2')
            return res.render('index2.ejs', {note, note2,MQL: JSON.stringify(Maql)})
        }
// let gettest = async function(req,res){
//     let [data] = await pool.query('select * from test');
    
//     return res.render('test.ejs',{image: data[9].image});
// }
// // const upload = multer().array('profile_pic',2);
// let posttest = async function(req, res){
//     let [data] = await pool.query('select * from danhsachtksv')
//     let SDT = req.body.SDT;
//     console.log(SDT);
//         // await pool.execute('insert into test(image) values(?)',[req.file.filename]);
//         // Display uploaded image for user validation
//         let result = "Bạn đã tải lên những hình ảnh này: ";
//         const files = req.files;
//         console.log(files);
//         let index, len;
//         for(index = 0, len = files.length; index < len; ++index){
//             result += `<img src="${files[index].filename}" width="300" style="margin-right: 20px;">`;
//         }
//         res.send(result);
// }
let showimage = async function(req, res){
    let [data] = await pool.query('select * from thongtinsv')
    let {Masv} = req.params;
    console.log(Masv);
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){
            const file1 = data[i].image_CCCD1;
            const file2 = data[i].image_CCCD2;
            console.log(data[i].image_CCCD1);
            let result = `<img src = "/image/${file1}" width="300" style="margin-right: 20px;">`
            +`<img src = "/image/${file2}" width="300" style="margin-right: 20px;">`
           return res.send(result);
        }
    }
}
let getdangkyphong =async function(req, res){
    let [data] = await pool.query('select * from danhsachtksv');
    let Masv = req.params.Masv;
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){
           let check = new Date(data[i].Ngaysinh);
           let ngay = check.getDate();
           let thang = check.getMonth()+1;
           let nam = check.getFullYear();
           let loaiphong = req.body.loaiphong;   
            return res.render('index_dkphong.ejs',
            {HoTen: data[i].Hoten, Masv, Ngay: ngay, Thang: thang, Nam: nam, Email: data[i].Email, CCCD: data[i].CCCD, loaiphong});
        }}}
let getavatar =async function(req, res){
    let [data] = await pool.query('select * from thongtinsv');
    let [data2] = await pool.query('select * from thongtinntsv');
    let Masv = req.params.Masv;
    for(let i=0; i<data.length; i++){
        for(let j=0; j<data2.length; j++){
        if(Masv==data[i].MaSV && Masv==data2[j].MaSV){
            return res.render('index_avatar.ejs',
            {HoTen: data[i].Hoten, Masv, Ngaysinh: data[i].Ngaysinh, Email: data[i].Email, Email_daihoc:data[i].Email_daihoc, CCCD: data[i].CCCD, 
            Maphong: data[i].Maphong, SDT: data[i].SDT, GioiTinh: data[i].GioiTinh, Truong: data[i].Truong, Khoa: data[i].Khoa,
            Nganh: data[i].Nganh, image_CCCD1: data[i].image_CCCD1, image_CCCD2: data[i].image_CCCD2, Dantoc: data[i].Dantoc, 
            address: data[i].address, DTUT: data[i].DTUT, Hoten_ntsv: data2[j].Hoten_ntsv, Quanhe: data2[j].Quanhe, SDT_phuhuynh: data2[j].SDT_phuhuynh,
            DCTT: data2[j].DCTT});
    }}}}
let getduyetswaproom =async function(req, res){
    let [data] = await pool.query('select * from danhsachtksv');
    let [data2] = await pool.query('select * from danhsachphong');
    let Masv = req.params.Masv;
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){
            return res.render('index_duyetswaproom.ejs',{HoTen: data[i].Hoten, Masv, data2});
        }}}
let getswaproom =async function(req, res){
    let [data] = await pool.query('select * from thongtinsv');
    let Masv = req.params.Masv;
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){
            return res.render('index_swapphong.ejs',{HoTen: data[i].Hoten, Masv, Maphong: data[i].Maphong});
        }}}
let postswaproom =async function(req, res){
    let {Maphong, Maphong2, note} = req.body;
    await pool.execute(`insert into dkchuyenphong(Maphong, Maphongmoi, lydo) values(?,?,?)`,[Maphong, Maphong2, note])
    return res.send("upload thành công");
}   
let postdangkyphong = async function(req, res){
    let [data] = await pool.query('select * from thongtinsv');
    let {MaSV, Maphong, Hoten, ngaysinh, gioitinh, SDT, Email_TDH, Email_cn, Truong, key, Nganh, CCCD, dantoc, diachi, doituonguutien} = req.body;        
    console.log(MaSV, Maphong, Hoten, ngaysinh, gioitinh, SDT, Email_TDH, Email_cn, Truong, key, Nganh, CCCD, dantoc, diachi, doituonguutien);   
    let {Hoten_ntsv, relationship, sodienthoai, dctt} = req.body;
    let {loaiphong, Makytucxa, Maday} = req.body;
        const files = req.files;
        let index, len;
        await pool.execute(`insert into hosodangky(MaSV, Maphong, Hoten, Ngaysinh, CCCD, SDT, Email, Email_daihoc, GioiTinh, Truong, Khoa, Nganh, 
            Dantoc, address, DTUT, Hoten_ntsv, Quanhe, SDT_phuhuynh, DCTT, Maktx, Maday, Loaiphong, Tinhtrang) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [MaSV, Maphong, Hoten, ngaysinh, CCCD, SDT,  Email_cn, Email_TDH, gioitinh, Truong, key, Nganh, dantoc, diachi, doituonguutien,
            Hoten_ntsv, relationship, sodienthoai, dctt, Makytucxa, Maday, loaiphong, "Chưa duyệt"]);
        for(index = 0, len = files.length; index < len; ++index){
            if(index==0){
                await pool.execute('update hosodangky set image_CCCD1 = ? where MaSV = ?',[files[index].filename, MaSV]);
            }else if(index=1){
                await pool.execute('update hosodangky set image_CCCD2 = ? where MaSV = ?',[files[index].filename, MaSV]);
            }
        }
        await pool.execute('update hosodangky set Tinhtrang = ? where MaSV = ?', ["Đã duyệt", MaSV])
        return res.send("upload thành công")
}
let getdsphong = async function(req, res){
    let [data] = await pool.query('select * from danhsachtksv');
    let [data2] = await pool.query('select * from danhsachphong');
    let Masv = req.params.Masv;
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){   
            return res.render('index_dsphong.ejs',{HoTen: data[i].Hoten, Masv, data2,});
        }}
}
let getdsdaduyet = async function(req, res){
    let [data] = await pool.query('select * from danhsachtkql');
    let [data2] = await pool.query('select * from hosodangky');
    let Maql = req.params.Maql;
    for(let i=0; i<data.length; i++){
        if(Maql==data[i].Maquanly){   
            return res.render('index2_dsddaduyet.ejs',{HoTen: data[i].Hoten, Maql, data2});
        }}
}
let getduyetphong = async function(req, res){
    let [data] = await pool.query('select * from danhsachtksv');
    let [data2] = await pool.query('select * from hosodangky');
    let Masv = req.params.Masv;
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){   
            return res.render('index_dkphong_duyet.ejs',{HoTen: data[i].Hoten, Masv, data2});
        }}
}
let getduyetdondkphong = async function(req, res){
    let [data] = await pool.query('select * from danhsachtkql');
    let [data2] = await pool.query('select * from hosodangky');
    let Maql = req.params.Maql;
    for(let i=0; i<data.length; i++){
        if(Maql==data[i].Maquanly){   
            return res.render('index2_dddkphong.ejs',{HoTen: data[i].Hoten, Maql, data2});
        }}
}
let postduyetdondkphong = async function(req, res){
    let [data] = await pool.query('select * from hosodangky');
    let [data2] = await pool.query('select * from danhsachphong');
    let Maql = req.params.Maql
    let Masv = req.body.Masv;
    let check;
    let soluong=0;
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){
            check=data[i].Maphong;
            console.log(check);
            await pool.execute(`insert into thongtinsv(MaSV, Maphong, Hoten, Ngaysinh, CCCD, SDT, Email, Email_daihoc, 
            GioiTinh, Truong, Khoa, Nganh, image_CCCD1, image_CCCD2, Dantoc, address, DTUT) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [data[i].MaSV, data[i].Maphong, data[i].Hoten, data[i].Ngaysinh, data[i].CCCD, data[i].SDT, data[i].Email, data[i].Email_daihoc,data[i].GioiTinh, 
            data[i].Truong, data[i].Khoa, data[i].Nganh, data[i].image_CCCD1, data[i].image_CCCD2,data[i].Dantoc, data[i].address, data[i].DTUT]);
            console.log(check);
            await pool.execute(`insert into thongtinntsv(MaSV, Hoten_sv, Hoten_ntsv, Quanhe, SDT_phuhuynh, DCTT) values(?,?,?,?,?,?)`,
                [data[i].MaSV, data[i].Hoten, data[i].Hoten_ntsv, data[i].Quanhe, data[i].SDT_phuhuynh, data[i].DCTT])
            for(let j=0; j<data2.length; j++){
                if(check==data2[j].Maphong){
                soluong = data2[j].soluongconlai;
                soluong++;
                await pool.execute('update danhsachphong set soluongconlai = ? where Maphong = ?',[soluong, data2[j].Maphong]);  
                }
            }
        }
    }
    await pool.execute('update hosodangky set Tinhtrang = ? where MaSV = ?',["Đã duyệt", Masv]);
    return res.redirect('/trang-chu/user/'+Maql+'/danh-sach-don') 
    
}
var signup = async function(req, res){
        let [data] = await pool.query('select * from danhsachtksv')
        let Masv = req.body.Masv;
        let password = req.body.password;
        let check;
        // let regex = /^\s$/
        if(Masv==""){
            req.flash('note1', "Mã sinh viên không được để trống!");
            return res.redirect('/');}
        if(password==""){
            req.flash('note1', "Mật khẩu không được để trống!");
            return res.redirect('/');
        }          
        else if(Masv!="" || password!=""){
            for(let i=0; i<data.length; i++){
                if(Masv!=data[i].MaSV || password!=data[i].matkhau){
                    check = false;
                }else{
                    return res.render('index_trangchu.ejs',{MSV: data[i].MaSV, Ht: data[i].Hoten});}
            }
            if(check==false){
                req.flash('note2', "Thông tin đăng nhập không hợp lệ!");
                return res.redirect('/');}          
         }
}
var signup2 = async function(req, res){
    let [data] = await pool.query('select * from danhsachtkql')
    let Maql = req.body.Maql;
    let password = req.body.password;
    let check;
    // let regex = /^\s$/
    if(Maql==""){
        req.flash('note1', "Mã quản lý không được để trống!");
        return res.redirect('/quan-ly/dang-nhap');}
    if(password==""){
        req.flash('note1', "Mật khẩu không được để trống!");
        return res.redirect('/quan-ly/dang-nhap');
    }          
    else if(Maql!="" || password!=""){
        for(let i=0; i<data.length; i++){
            if(Maql!=data[i].Maquanly || password!=data[i].matkhau){
                check = false;
            }else{
                return res.render('index2_trangchu.ejs',{MQL: data[i].Maquanly, Ht: data[i].Hoten});}
        }
        if(check==false){
            req.flash('note2', "Thông tin đăng nhập không hợp lệ!");
            return res.redirect('/quan-ly/dang-nhap');}          
     }
}
let getsignup2 = async function(req,res){
    let [data] = await pool.query('select * from danhsachtkql');
    let Maql = req.params.Maql;
    for(let i=0; i<data.length; i++){
        if(Maql==data[i].Maquanly){
            return res.render('index2_trangchu.ejs',{MQL: data[i].Maquanly, Ht: data[i].Hoten});}
        }
    }
let getsignup = async function(req,res){
    let [data] = await pool.query('select * from danhsachtksv');
    let Masv = req.params.Masv;
    for(let i=0; i<data.length; i++){
        if(Masv==data[i].MaSV){
            return res.render('index_trangchu.ejs',{MSV: data[i].MaSV, Ht: data[i].Hoten});}
        }
    }
let getdk = function(req, res){
        return res.render('index_register.ejs')}
let getforgot = function(req,res){
    let note = req.flash('note1')
    let num;
    return res.render('index_Forgot.ejs', {note, num})}
let postforgot = async function(req, res){
    let [data] = await pool.query('select * from danhsachtksv');
    let {Email} = req.body;
    let note;
    if(Email==""){
        req.flash('note1', "Email không được để trống!");
        return res.redirect('/quen-mat-khau');}
    else{
        //tạo link
        const {sign} = require('./jwt');
        let host = req.header('host');
        let resetlink = `${req.protocol}://${host}/reset?token=${sign(Email)}&email=${Email}`;
        console.log(resetlink);
        //Gửi mail
        for(let i=0; i<data.length; i++){
            if(Email==data[i].Email){
                const {sendPasswordMail} = require('./mail')
                sendPasswordMail(data[i].Email, host, resetlink);
                return res.render('index_Forgot.ejs', {num: true, note});}}
        return res.render('index_Forgot.ejs',{num: false, note}); }}
let showresetpassword = function(req, res){
    let note = req.flash('note1');
    let token = req.query.token;
    let checkEmail = req.query.email;
    const {verify} = require('./jwt')
    console.log(checkEmail);
    console.log(token);
    if(!token || !verify(token)){
        return res.render('resetpassword', {expired: true})
    }else{
        return res.render('resetpassword', {expired: false, note, checkEmail});
    }
}
let postresetpassword = async function(req, res){
    let password = req.body.password;
    let Email = req.body.Email;
    let xacnhanmk = req.body.xacnhanmk;
    let [data] = await pool.query('select matkhau from danhsachtksv');
    if(password==""){
        return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
        Password không được để trống!</p>`);
    }
    else{
        if(password.length<6){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            Mật khẩu phải 6 ký tự trở lên!</p>`);
        }
    }
    if(xacnhanmk==""){
        return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
        xác nhận mật khẩu không được để trống!</p>`)
    }else{
        if(password != xacnhanmk){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            mật khẩu xác nhận không trùng!</p>`)}}
    await pool.execute('update danhsachtksv set matkhau = ? where Email = ?',[password, Email]);
    return res.redirect('/')
}
let creater = async function(req, res){
    let [data] = await pool.query('SELECT * FROM danhsachtksv')
    let {Masv, Hoten, Birthday, CCCD, email, SDT, password, xacnhanmk} = req.body;
    if(Masv==""){
           return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
           Mã sinh viên không được để trống!</p>`)
        }
        else{
            for(let i=0; i<data.length; i++){
                if(Masv==data[i].MaSV){
                    return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                    Mã sinh viên đã tồn tại!</p>`)
                }
            }
            if(Masv.length<10){
                return res.send("test")
            } 
        }
        if(Hoten==""){   
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            Họ tên không được để trống!</p>`)
        }
        if(Birthday==""){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            Mã sinh viên không được để trống!</p>`)
        }
        if(CCCD==""){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            CCCD không được để trống!</p>`)
        }else{
            if(CCCD.length != 12){
                return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                CCCD phải ghi 12 số!</p>`)
            }
            let regex = /^[0-9]\d{11}/
            if(regex.test(CCCD)==false){
                return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                CCCD là ký tự số!</p>`)
            }
        }
        if(email==""){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            Email không được để trống!</p>`)
        }else{
            let regex = /^\S+@\S+\.com/
            if(regex.test(email)==false){
                return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                Email sai, yêu cầu nhập lại!</p>`)
            }
            for(let i=0; i<data.length; i++){
                if(email==data[i].Email){
                    return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                    Email này không tồn tại!</p>`)
                }}
        }
        if(SDT==""){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            Số điện thoại không được để trống!</p>`)
        }else{
            if(SDT.length<10 && SDT.length>11){
                return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                Số điện thoại không hợp lệ!</p>`)
            }
            var regex = /^[0-9]\d{9}/
            if(regex.test(SDT)==false){
                return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                Số điện thoại phải nhập bằng số!</p>`)
            }
        }
        if(password==""){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            Mật khẩu không được để trống!</p>`)
        }else{
            if(password.length < 6){
                return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                Mật khẩu phải có độ dài tối thiểu 6 ký tự!</p>`)
            }
        }
        if(xacnhanmk==""){
            return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
            xác nhận mật khẩu không được để trống!</p>`)
        }else{
            if(password != xacnhanmk){
                return res.send(`<p style="color: red; text-align: center; margin-top: auto; margin-bottom: auto; font-size: 35px;">
                mật khẩu xác nhận không trùng!</p>`)
                }}
        await pool.execute('insert into danhsachtksv(MaSV, Hoten, Ngaysinh, CCCD, SDT, Email, matkhau) values(?,?,?,?,?,?,?)',
        [Masv, Hoten, Birthday, CCCD, SDT, email, password]);
        return res.redirect('/')
}
module.exports = { //export 1 object module
    getHomepage, getHomepage2,
    getdk,
    getforgot,
    creater,
    signup, signup2,
    getsignup, getsignup2,
    postforgot, getdsdaduyet, getavatar, showimage, getduyetswaproom, getswaproom, postswaproom,
    showresetpassword,postresetpassword,getdangkyphong,postdangkyphong, getdsphong, getduyetphong, getduyetdondkphong, postduyetdondkphong
}