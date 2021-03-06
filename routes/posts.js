const router = require("express").Router();

const Post = require("../models/Post");
const User = require("../models/User");

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
				{ new: true }
			);
			res.status(200).json("Post alterado com sucesso!");
		} else {
			res.status(403).json("Você só pode alterar seus posts");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//delete a post
router.delete("/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);

	try {
		if (post.userId === req.body.userId) {
			await Post.findByIdAndDelete(req.params.id);
			res.status(200).json("Post deletado com sucesso!");
		} else {
			res.status(403).json("Você só pode deletar seus posts");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//like/dislike a post
router.put("/:id/likes", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne(
				{ $push: { likes: req.body.userId } },
				{ new: true }
			);
			res.status(200).json("Post curtido com sucesso!");
		} else {
			await post.updateOne(
				{ $pull: { likes: req.body.userId } },
				{ new: true }
			);
			res.status(200).json("Post descurtido com sucesso!");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//get a post by id
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
});

//get timeline posts
router.get("/timeline/all", async (req, res) => {
	try {
		const currentUser = await User.findById(req.body.userId);
		const userPosts = await Post.find({ userId: currentUser._id });
		const friendsPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);
		res.json(userPosts.concat(...friendsPosts));
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
