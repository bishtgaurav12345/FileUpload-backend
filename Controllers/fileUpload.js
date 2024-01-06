const File = require("../Models/File");
const cloudinary = require("cloudinary").v2;
//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

//function for cloudinary upload

async function uploadToCloudinary(file,folder){
  const options ={folder};
 return await cloudinary.uploader.upload(file.tempFilePath,options);
}


// funtion for checking supported fileType

function isFileTypeSupported(supportedFile,fileType){
    return supportedFile.include(fileType);
}


//image upload handler


exports.imgUpload = async(req,res)=>{
    try{
        const {name,tags,email} =req.body;
        console.log(name,tags,email);

        const file = req.files.imgFile;
        const supportedFile = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(supportedFile,fileType)){
            return res.status(400).json({
                success:false,
                message:"file format not supported Please upload in supported format"
            })
        }

        // if file format supported
        const response = await uploadToCloudinary(file,"MediaFolder")
        console.log(response);
        res.json({
            success:true,
            message:"img uploaded in cloudinary successfully"
        })
        //cloudinary url saving to db 

        //const file

    }
    catch(error){
        res.status(400).json({
            success:false,
            message:"something is not good "
        })
    }
}