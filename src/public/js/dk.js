function dangky(){
    var Msv = document.getElementsByName("Masv").value;
    var ten = document.getElementsByName("Hoten").value;
    var namsinh = document.getElementsByName("Birthday").value;
    var cccd = document.getElementsByName("CCCD").value;  
    var sdt = document.getElementsByName("SDT").value;
    var email = document.getElementsByName("email").value;
    var matkhau = document.getElementsByName("password").value;
    var xnmatkhau = document.getElementsByName("xacnhanmk").value;
    if(Msv == ""){
        alert("Mã sinh viên không được để trống");
        return false;
    }else{
        if(Msv.length > 10){
            alert("Mã sinh viên không chính xác");
            return false;
        }
        // if(Msv == data.Msv){
        //     alert("Mã sinh viên đã tồn tại")
        //     return false;
        // }
    }
    if(ten == ""){
        alert("Họ và tên không được để trống");
        return false;
    }
    if(namsinh == ""){
        alert("năm sinh không được để trống");
        return false;
    }else{
        if(namsinh.length != 4){
            alert("năm sinh phải ghi 4 số")
            return false;
        }
        var regex = /^[0-9]\d{3}/
        if(regex.test(namsinh)==false){
            alert("năm sinh phải là ký tự số")
            return false;
        }
    }
    if(cccd == ""){
        alert("CCCD không được để trống");
        return false;
    }else{
        if(cccd.length != 12){
            alert("CCCD phải ghi 12 số")
            return false;
        }
        var regex = /^[0-9]\d{11}/
        if(regex.test(cccd)==false){
            alert("CCCD phải là ký tự số")
            return false;
        }
    }
    if(email == ""){
        alert("email không được để trống");
        return false;
    }else{
        var regex = /^\S+@\S+\.edu+\.vn/
        if(regex.test(email)==false){
            alert("email sai, yêu cầu nhập lại")
            return false;
        }
    }
    if(sdt == ""){
        alert("Số điện thoại không được để trống");
        return false;
    }else{
        if(sdt.length != 10){
            alert("Số điện thoại phải ghi 10 số")
            return false;
        }
        var regex = /^[0-9]\d{9}/
        if(regex.test(sdt)==false){
            alert("số điện thoại sai, yêu cầu nhập lại")
            return false;
        }
    }
    if(matkhau == ""){
        alert("mật khẩu không được để trống");
        return false;
    }else{
        if(matkhau.length < 6){
            alert("Mật khẩu phải có độ dài tối thiểu 6 ký tự")
            return false;  
        }
    }
    if(xnmatkhau == ""){
        alert("mật khẩu xác nhận không được để trống");
        return false;
    }else{
        if(matkhau != xnmatkhau){
            alert("mật khẩu xác nhận không trùng")
        }
    }
    return true
}
export default dangky;