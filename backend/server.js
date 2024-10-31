const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/category");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/blog")
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error));

//use routes

app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => console.log(`server running on ${PORT}`));




