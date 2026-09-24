const GardenPost = require("../models/GardenPost");
const User = require("../models/User");

const createGardenPost = async (req, res) => {
    try {
        const { image, caption } = req.body;

        if (!image || !caption) {
            return res.status(400).json({
                message: "Image and caption are required"
            });
        }

       const loggedInUser = await User.findById(req.user.id);

if (!loggedInUser) {
    return res.status(404).json({
        message: "User not found"
    });
}

const newPost = new GardenPost({
    user: loggedInUser._id,
    userName: loggedInUser.name,
    image,
    caption
});

        const savedPost = await newPost.save();

        res.status(201).json({
            message: "Garden post created successfully",
            post: savedPost
        });

    } catch (error) {
        console.error("Create garden post error:", error);

        res.status(500).json({
            message: "Failed to create garden post"
        });
    }
};

/* =========================================================
   GET ALL GARDEN POSTS
========================================================= */

const getGardenPosts = async (req, res) => {
    try {

        const posts = await GardenPost.find()
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        console.error("Get garden posts error:", error);

        res.status(500).json({
            message: "Failed to fetch garden posts"
        });

    }
};
/* =========================================================
   LIKE GARDEN POST
========================================================= */

const likeGardenPost = async (req, res) => {

    try {

        const postId = req.params.id;
        const userId = req.user.id;

        // First find the post
        const post = await GardenPost.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Garden post not found"
            });
        }

        // User cannot like their own post
        if (
            post.user.toString() ===
            userId.toString()
        ) {
            return res.status(403).json({
                message: "You cannot like your own post."
            });
        }

        /*
            ATOMIC LIKE OPERATION

            The post will only be updated if:
            1. This user has NOT already liked it.
            2. The post exists.

            $addToSet prevents the same user
            from being added to likedBy twice.
        */

        const updatedPost =
            await GardenPost.findOneAndUpdate(

                {
                    _id: postId,

                    likedBy: {
                        $ne: userId
                    }
                },

                {
                    $addToSet: {
                        likedBy: userId
                    },

                    $inc: {
                        likes: 1
                    }
                },

                {
                    new: true
                }
            );

        // If no document was updated,
        // the user has already liked this post.
        if (!updatedPost) {

            return res.status(400).json({
                message: "You have already liked this post."
            });

        }

        res.status(200).json({
            message: "Post liked",
            likes: updatedPost.likes
        });

    } catch (error) {

        console.error(
            "Like garden post error:",
            error
        );

        res.status(500).json({
            message: "Failed to like post"
        });
    }
};


/* =========================================================
   DELETE GARDEN POST
========================================================= */

const deleteGardenPost = async (req, res) => {
    try {
        const post = await GardenPost.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Garden post not found"
            });
        }

        if (post.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You can only delete your own posts"
            });
        }

        await GardenPost.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Garden post deleted successfully"
        });

    } catch (error) {
        console.error("Delete garden post error:", error);

        res.status(500).json({
            message: "Failed to delete garden post"
        });
    }
};

module.exports = {
    createGardenPost,
    getGardenPosts,
    likeGardenPost,
    deleteGardenPost
};