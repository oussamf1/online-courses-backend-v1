const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const token = req.cookies.token;
  console.log(req.cookies.token);
  if (!token) {
    return res.send({ loginStatus: false, isAdmin: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.send({ loginStatus: true, isAdmin: req.user.isAdmin });
  } catch (ex) {
    return res
      .status(402)
      .send({ loginStatus: false, isAdmin: req.user.isAdmin });
  }
}
module.exports = auth;
