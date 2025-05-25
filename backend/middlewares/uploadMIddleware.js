const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the original file name
    }
});

// file filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());// Check if the file type is allowed
    const mimetype = allowedTypes.test(file.mimetype); // Check if the MIME type is allowed
    if (extname && mimetype) {
        return cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed!'), false); // Reject the file
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: fileFilter // Apply the file filter
})

module.exports = upload;