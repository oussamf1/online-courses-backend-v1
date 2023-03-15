const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.send({ loginStatus: false, isAdmin: false });
  }
  try {
    console.log("auth");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (ex) {
    res.status(402).send({ loginStatus: false, isAdmin: req.user.isAdmin });
  }
}
module.exports = auth;
