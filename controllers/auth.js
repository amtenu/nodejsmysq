const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});
(exports.loginRegister = (req, res) => {
  console.log(req.body);
  // const name=req.body.name;
  // const email=req.body.email;
  // const password=req.body.password;
  // const passwordConfirm=req.body.passwordConfirm;

  //destructuring of the above
  const { name, email, password, passwordConfirm } = req.body;

  //positional parameters avoiding injection attacks
  db.query("SELECT email from users FROM users WHERE email=?", [email]);
}),
  (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.render("register", {
        message: "email already registered",
      });
    } else if (password !== passwordConfirm) {
      return res.render("register", {
        message: "Passwords do not Match !",
      });
    }
  };
