import jwt from "jsonwebtoken";

const createToken = (jwtPayload: { email: string; status: string }, secret: string, expiresIn: string) => {
    const token = jwt.sign(jwtPayload, secret, { expiresIn });
    return token;
};

export default createToken;
