const Counselor = require("../models/counselorModel");
const { validationResult } = require("express-validator");
const pick = require("lodash/pick");

const counselorCtrl = {};


//creating  a counselor details 
counselorCtrl.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = pick(JSON.parse(req.body.payload), ["profile", "specialization", "availability", "experiences", "consultationFees", "bio", "languages", "achievements", "categories", "image"]);
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Please upload an image"
        })
    }
    body.image = req.file.path;

    try {
        const newCounselor = new Counselor(body);
        const savedCounselor = await newCounselor.save();
        res.status(201).json({
            success: true,
            message: "Counselor created successfully",
            counselor: savedCounselor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create counselor",
            error: error.message
        })
    }
}

//updating counselor and adding video to counselor 
counselorCtrl.createVideo = async (req, res) => {
    const { counselorId, type } = req.params;
    const { body } = req;
    const videos = req.files;

    if (type === "video") {
        if (!videos || videos.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least 1 video"
            });
        }

        const videoPaths = videos.map((video) => video.path);

        try {
            const counselor = await Counselor.findByIdAndUpdate(
                counselorId,
                { $push: { introductoryVideos: { $each: videoPaths } } },
                { new: true }
            );

            if (!counselor) {
                return res.status(404).json({
                    success: false,
                    message: "Counselor not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Videos added successfully",
                counselor
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Failed to save videos",
                error: e.message
            });
        }
    } else {
        try {
            const updatedData = await Counselor.findByIdAndUpdate(
                counselorId,
                { $set: body },
                { new: true }
            );

            if (!updatedData) {
                return res.status(404).json({
                    success: false,
                    message: "Counselor not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Counselor details updated successfully",
                counselor: updatedData
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Failed to update counselor details",
                error: e.message
            });
        }
    }
};



module.exports = counselorCtrl;
