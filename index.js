const expres = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const  userRoute = require("./routes/users");
const  authRoute = require("./routes/auth");  

dotenv.config();

mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("Connected to MongoDB :database!")
);

const app = expres();

//middleware
app.use(expres.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
	console.log("server is running on port 8800 🚀 ");
});
