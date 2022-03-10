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

module.exports = router;
