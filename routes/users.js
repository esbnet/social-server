const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

//update user
router.put("/:Id", async (req, res) => {
	if (req.body.userId === req.params.Id || req.body.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}

		try {
			const user = await User.findByIdAndUpdate(
				req.params.Id,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json("Usuário atualizado com sucesso!");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("Você só pode atualizar sua conta!");
	}
});

//delete user
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json("Usuário deletado com sucesso!");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("Você só pode deletar sua conta!");
	}
});

//get user
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (err) {
		res.status(500).json("Houve um erro com o db: " + err);
	}
});

//follow a user
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);

			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });
				res.status(200).json("Usuário seguido com sucesso!");
			} else {
				return res.status(403).json("Você já segue esse usuário!");
			}
		} catch (err) {
			res.status(500).json("Houve um erro com o db: " + err);
		}
	} else {
		res.status(403).json("Você não pode seguir a você mesmo!");
	}
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);

			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: req.params.id } });
				res.status(200).json("Usuário deixado de seguido com sucesso!");
			} else {
				return res.status(403).json("Você não segue esse usuário!");
			}
		} catch (err) {
			res.status(500).json("Houve um erro com o db: " + err);
		}
	} else {
		res.status(403).json("Você não pode deixar de seguir a você mesmo!");
	}
});

module.exports = router;
