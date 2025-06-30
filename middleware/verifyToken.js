const jwt=require('jsonwebtoken');

module.exports=function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) 
    {
        return res.status(401).send("Access Denied: No or Invalid Token");
    }
    const token = authHeader.split(' ')[1];
    try 
    {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } 
    catch (err)
    {
        return res.status(403).send("Invalid or Expired Token");
    }
}