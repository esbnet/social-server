const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:Id", async (req, res) => {
	if (req.body.userId === req.params.Id || req.user.isAdmin) {
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}

		try {
			const user = await User.findByIdAndUpdate(req.params.Id, {
				$set: req.body,
			});
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
	if (req.body.userId === req.params.id || req.user.isAdmin) {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
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

		res.status(200).send(user);
	} catch (err) {
		res.status(500).send("Houve um erro com o db: " + err);
	}
});

//get all users
//follow a user
//unfollow a user

router.get("/", (req, res) => {
	res.send("Home page");
});

module.exports = router;
