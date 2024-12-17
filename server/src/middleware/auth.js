import jwt from "jsonwebtoken";
// note: 12/17 the auth is not working in the login, unauthorized error 401 password does not match. it does its the token it doesnt match
// note: same day: the login does work only if your have secret key in your env. the redirect in the front works just redirected to the wrong place

export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const headers = req.headers.authorization;
    if (headers) {
        let token = headers.split(" ")[1];
        if (token) {
            const secretKey = process.env.JWT_SECRET_KEY || "";
            jwt.verify(token, secretKey, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                req.user = data;
                next();
            });
        }
    }
    else {
        res.send(400).json({ message: "Couldn't find token" });
    }
};
