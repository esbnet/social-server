const router = require("express").Router();

const Post = require("../models/Post");

//create a new post
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

//update a post
router.put("/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);

	try {
		if (post.userId === req.body.userId) {
			const updatedPost = await Post.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);
			res.status(200).json("Post alterado com sucesso!");
		} else {
			res.status(403).json("Você só pode alterar seu post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//delete a post
//like a post
//get a post by id
//get timeline posts

module.exports = router;
