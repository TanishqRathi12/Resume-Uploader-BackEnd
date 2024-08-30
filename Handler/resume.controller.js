const Resume = require('../Model/resume.model');

const uploadResume = async(req,res)=>{
    
    const {resumeUrl} = req.body;
    try{
        if(!resumeUrl){
            return res.status(400).json({msg:'Please upload a resume'});
        }
        const newResume = new Resume({
            resumeUrl
        });
        const savedResume = await newResume.save();
        res.json({message:'Resume saved successfully',data:savedResume});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

module.exports = {
    uploadResume
}