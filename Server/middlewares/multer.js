import multer from "multer";

// creating a storage in the multer
const storage = multer.memoryStorage();

// uploading the profile picture
export const singleUpload = multer({ storage }).single("profilePicture")

// Uploading the resume
export const resumeUpload = multer({ storage }).single("resume");
