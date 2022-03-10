const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

router.post("/register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const user = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		const newUser = await user.save();
		res.status(201).send(newUser);
	} catch (err) {
		res.status(500).send("Houve um erro com o db: " + err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).send("Usário ou senha inválidos");
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res.status(400).send("Usário ou senha inválidos");
		}

		res.status(200).send(user);
	} catch (err) {
		res.status(500).send("Houve um erro com o db: " + err);
	}
});

module.exports = router;
