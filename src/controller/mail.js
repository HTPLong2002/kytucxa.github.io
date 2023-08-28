const Mailjet = require('node-mailjet');

function sendPasswordMail(data, host, resetlink){
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE,
    );
    
    const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
              Messages: [
                {
                  From: {
                    Email: "20t1020453@husc.edu.vn",
                    Name: "Ktx"
                  },
                  To: [
                    {
                      Email: data,
                      Name: `Long`
                    }
                  ],
                  Subject: "[ktx] Reset Password",
                  HTMLPart: `
                  Hi ${data},
                  Gần đây, bạn đã yêu cầu đặt lại mật khẩu cho tài khoản ${host} của mình. 
                  Nhấp vào nút bên cạnh để tiếp tục:
                  <a href="${resetlink}">Reset Password</a>
                  .Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này hoặc trả lời để cho chúng tôi biết.
                  Liên kết đặt lại mật khẩu này chỉ có hiệu lực trong 5 phút tiếp theo.`       
                }
              ]
            })
            request
            .then((result) => {
                console.log(result.body)
            })
    return request;
}
module.exports = {
    sendPasswordMail,
}