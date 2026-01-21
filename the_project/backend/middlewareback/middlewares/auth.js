const config = require('../utils/config')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const authorization = req.get('authorization');
    //console.log(authorization);
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    } else {
        return null
    }
}

const isAuthenticated = (req, res, next) => {
    const token = getTokenFrom(req);
    console.log(token);

    if(!token){
        return res.status(401).json(
            { error: "auth token missing" }
        )
    }

    let decodedToken = null;

    try{
        decodedToken = jwt.verify(token, config.SECRET);
    }
    catch(error){
        console.log("jwt error")
    }
    
    if(!decodedToken || !decodedToken.id){
        return res.status(401).json(
            { error: "invalid token" }
        )
    }

    // NEW:
    res.locals.auth = {userId: decodedToken.id};
    next();
}

module.exports = isAuthenticated;