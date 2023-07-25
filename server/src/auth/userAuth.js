const fs = require("fs");

const auth = (req, res, next) => {
    const token = JSON.parse(req.body.token)
    fs.readFile("./src/user.json", "utf8", (err, jsonString) => {
        if (err) {
            return res.status(500).json({ status: true, message: "oops something went wrong!!" })
        }
        else {
            const data = JSON.parse(jsonString)

            // if user present 
            if (token.email) {

                // if password matched
                if (data[req.body.email] === req.body.password) {
                    next()


                    // if password matched
                } else {
                    return res.status(403).json({ status: false, message: "user not authorized !!" })
                }

                // if user not present 
            } else {
                return res.status(403).json({ status: false, message: "user not authorized !!" })
            }
        }
    });
}

module.exports = { auth }