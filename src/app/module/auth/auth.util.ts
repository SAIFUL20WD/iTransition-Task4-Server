import jwt from "jsonwebtoken";

const createToken = (jwtPayload: { email: string; status: string }, secret: string, expiresIn: string) => {
    // @ts-expect-error valid
    const token = jwt.sign(jwtPayload, secret, { expiresIn });
    return token;
};

export default createToken;
