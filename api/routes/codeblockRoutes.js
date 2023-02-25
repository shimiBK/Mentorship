const express = require("express");
const {getCodeblocks , getCodeblock } = require("../controllers/codeblock")


const router = express.Router();


//get all codeblocks

router.get("/",getCodeblocks );

//get codeblock by id

router.get("/:id", getCodeblock );




module.exports = router;