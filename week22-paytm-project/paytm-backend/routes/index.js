const express = require('express');
const router = express.Router();
const { router: userRouter } = require('./user');
const {router :accountRouter}=require('./accounts')


router.use('/accounts',accountRouter)
router.use('/user',userRouter);
module.exports = router;