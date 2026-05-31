const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const upload = multer({ dest: "uploads/" });

router.post("/image", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        res.json({
            imageUrl: result.secure_url,
            public_id: result.public_id
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
