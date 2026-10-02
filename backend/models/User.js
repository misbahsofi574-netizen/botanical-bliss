const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

    {

        /* =====================================================
           BASIC USER INFORMATION
        ===================================================== */

        name: {

            type: String,
            required: true,
            trim: true

        },

        email: {

            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true

        },

        password: {

            type: String,
            required: true

        },

        role: {

            type: String,
            enum: ["user", "admin"],
            default: "user"

        },

        /* =====================================================
           PROFILE INFORMATION
        ===================================================== */

        phone: {

            type: String,
            trim: true,
            default: ""

        },

        profilePic: {

            type: String,
            default: ""

        },

        /* =====================================================
           USER ADDRESS
        ===================================================== */

        address: {

            type: String,
            trim: true,
            default: ""

        },

        city: {

            type: String,
            trim: true,
            default: ""

        },

        pincode: {

            type: String,
            trim: true,
            default: ""

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model("User", userSchema);