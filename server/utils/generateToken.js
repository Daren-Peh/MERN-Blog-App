import jwt from "jsonwebtoken";

//jwt.sign(id, secret, expiresIn)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
}


export default generateToken;