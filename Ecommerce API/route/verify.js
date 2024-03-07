/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.token;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECT_KEY, (err, user) => {
      if (err) {
        res.status(403).json("token is not valid!");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("User not authenticted!");
  }
};

/* const verifyTokenAuthorization =(req, res, next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
                next()
        }
        else{
            return res.status(403).json('Your not authorized ')
        }
    })
} */

const verifyTokenAuthorizetion = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.admin) {
      next();
    } else {
      res.status(403).json("User not authorizes");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.admin) {
      next();
    } else {
      res.status(403).json("User not authorizes");
    }
  });
};

module.exports = { verifyToken, verifyTokenAuthorizetion, verifyTokenAndAdmin };
