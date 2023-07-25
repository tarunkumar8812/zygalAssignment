const express = require("express")
const router = express.Router();

const { userLogin, sendMessage, searchMessage, clearMessage, userLogout } = require('../controller/userController')
const { auth } = require('../auth/userAuth')


router.post('/api/user/login', userLogin)


// to send meassge

router.post('/api/user/sendMessage', auth, sendMessage)


// to search meassge

router.post('/api/user/searchMessage', auth, searchMessage)


// to clear all meassge
router.post('/api/user/clearAllMessage', clearMessage)



// to logout
router.post('/api/user/logout', userLogout)



module.exports = router