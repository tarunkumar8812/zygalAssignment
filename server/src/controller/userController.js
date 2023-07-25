const fs = require("fs");

// lopgin api
const userLogin = (req, res) => {

    fs.readFile("./src/user.json", "utf8", (err, jsonString) => {
        if (err) {
            return res.status(500).json({ status: false, message: "oops something went wrong!!" })
        }
        else {
            const data = JSON.parse(jsonString)

            // if user present 
            if (data[req.body.email]) {

                // if password matched
                if (data[req.body.email] === req.body.password) {
                    
                    return res.status(200).json({ status: true, message: "Succesfull Login", token: `${JSON.stringify(req.body)}` })


                    // if password matched
                } else {
                    return res.status(401).json({ status: false, message: "Wrong Password !!" })
                }

                // if user not present 
            } else {
                console.log('hhhh');
                
                return res.status(404).json({ status: false, message: "User not Found!!" })
            }
        }
    });
}


// send message api
const sendMessage = (req, res) => {
    return res.status(200).json({ status: true, message: "authorized user" })
}



// search message api
const searchMessage = (req, res) => {
    return res.status(200).json({ status: true, message: "authorized user" })
}



// clear message api
const clearMessage = (req, res) => {
    return res.status(200).json({ status: true, message: "authorized user" })
}



// logout api
const userLogout = (req, res) => {
    return res.status(200).json({ status: true, message: "authorized user" })
}


module.exports = { userLogin, sendMessage, searchMessage, clearMessage, userLogout }