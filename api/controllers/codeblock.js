const CodeBlock = require("../models/Codeblock")
const {createError} = require("../utils/createError")



const getCodeblocks = async (req,res,next) =>{

    try {
        const Codeblocks = await CodeBlock.find();
        if(!Codeblocks){

            res.status(404).send("codeblocks not found")
        }

        res.status(200).json(Codeblocks);
        
    } catch (error) {
        next(error);
        
    }

};

const getCodeblock = async (req,res,next) =>{
    try {
        const codeblock = await CodeBlock.findOne({id:req.params.id});

        // if(!codeblock){
        //     return res.status(404).json("codeblocks not found")
        // }

        res.status(200).json(codeblock);
        
    } catch (error) {
        next(error);
        
    }
}


module.exports = {getCodeblocks,getCodeblock};
