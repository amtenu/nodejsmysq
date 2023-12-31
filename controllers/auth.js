const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { promisify } = require("util");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please provide email and password!",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (error, result) => {
        console.log(result);
        if (!result || !(await bcrypt.compare(password, result[0].password))) {
          res.status(401).render("login", {
            message: "Email or Password is incorrect",
          });
        } else {
          const id = result[0].id;

          const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log("The token is: " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.loginRegister = (req, res) => {
  console.log(req.body);
  // const name=req.body.name;
  // const email=req.body.email;
  // const password=req.body.password;
  // const passwordConfirm=req.body.passwordConfirm;

  //destructuring of the above
  const { name, email, password, passwordConfirm } = req.body;

  //positional parameters avoiding injection attacks
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
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
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users SET ?",
        {
          name: name,
          email: email,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            res.render("register", {
              message: "User Registered!",
            });
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  console.log(req.cookies);

  if (req.cookies.jwt) {
    try {
      //checking the token exists which  user is from
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);
      // checking if the user exists in the db

      db.query(
        "SELECT * FROM users WHERE id=?",
        [decoded.id],
        (error, result) => {
          console.log(result);

          if (!result) {
            return next();
          }

          req.user = result[0];
          return next();
        }
      );

      //
    } catch (error) {
      console.log(error);
      return next();
    }
  }  else { next();};

 
};


exports.logout=async(req,res)=>{
  //override the current cookie http only for security
  res.cookie('jwt','logout',{
    expires:new Date (Date.now()+ 2*1000),httpOnly:true
  })
  res.status(200).redirect('/')
}