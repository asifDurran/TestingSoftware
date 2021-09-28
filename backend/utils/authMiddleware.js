
import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
	const authHeaders = req.headers.authorization;
    if(authHeaders){
        const token = authHeaders.split('Bearer ')[1];
        
        try {
            jwt.verify(token, process.env.SECRET);
            next();
           
        } catch (error) {
           
            return res.status(401).json({ errors: [{ msg: 'Please add valid token' }] });
        }
    } else {
        return res.status(401).json({ errors: [{ msg: 'Please add token' }] });
    }
	
};
export default auth;