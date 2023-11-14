const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    
    try{
        decodedToken = jwt.verify(token, process.env.API_KEY);
    }catch(err){
        err.status = 500;
        throw err; 
    }
    
    if(!decodedToken){
        const error = new Error("not authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken._id;
    next();
}