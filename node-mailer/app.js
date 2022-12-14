// const nodemailer = require("nodemailer")

// // smtp

// const option ={
//     host: 'your smtp server',
//     port:25,
//     secure:false,//465ポートを使う場合
//     requireTLS:false,
//     tls:{
//     rejectUnauthorized:false,
//     },
//     auth:{//認証情報
//         user:'your userame',
//         pass:'your password'
//     },
// }

// const mail ={
//     from:'example@email',
//     to :'exampple@emial',
//     subject:'email test',
//     text:'email sent',
// }
// // メールの送信
// //
// (async () => {
//     try {
//       const transport = nodemailer.createTransport(options);
//       const result = await transport.sendMail(mail);
//       console.log('+++ Sent +++');
//       console.log(result);
//     } catch (err) {
//       console.log('--- Error ---');
//       console.log(err);
//     }
//   })();
  
const NodeMailer = require('nodemailer')

// メール送信関数
function sendMail (smtpData, mailData) {

  // SMTPサーバの情報をまとめる
  const transporter = NodeMailer.createTransport(smtpData)

  // メール送信
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      // エラー処理
      console.log(error)
    } else {
      // 送信時処理
      console.log('Email sent: ' + info.response)
    }
  })
}


// メイン処理
function main() {
  // SMTP情報を格納（Gmailの場合）
  const smtpData = {
    host: 'gmail.com', // Gmailのサーバ
    port: '465',            // Gmailの場合　SSL: 465 / TLS: 587
    secure: true,           // true = SSL
    auth: {
      user: 'example@mail.com',  // メールアドレス（自身のアドレスを指定）
      pass: 'passeword'            // パスワード（自身のパスワードを指定）
    }
  }

  // 送信内容を作成
  const mailData = {
    from: '"テストユーザ" <' + smtpData.auth.user + '>', // 送信元名
    to: 'example@mail.com',                         // 送信先
    subject: 'こんにちは',                               // 件名
    text: 'お元気ですか？',                              // 通常のメール本文
    html: '<b>お元気ですか？</b>',                       // HTMLメール
  }

  // メールを送信
  sendMail(smtpData, mailData)
}

// 実行
main()
