const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cors());

//Database Connection with mongoDB

mongoose.connect(
  "mongodb+srv://praveen:Praveen2001@cluster0.qmskfad.mongodb.net/e-commerce"
);

//API Endpoint

app.get("/", (req, res) => {
  res.send("Express App is running");
});

//Image Storage Engine

// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

//Creating Upload Endpoint for images

// app.use("/images", express.static("upload/images"));

// app.post("/upload", upload.single("product"), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:${port}/images/${req.file.filename}`,
//   });
// });

//Schema for creating products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//Schema for User model

const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//API to Add Product

app.post("/addProduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let lastProductArr = products.slice(-1);
    let lastProduct = lastProductArr[0];
    id = lastProduct.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//API to delete Product

app.post("/removeProduct", async (req, res) => {
  await Product.findOneAndDelete({
    id: req.body.id,
  });
  console.log("Removed");
  res.json({
    success: true,
    id: req.body.id,
  });
});

//API to get all Products

app.get("/allProducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

//API to register the User

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.json({
      success: false,
      error: "Given email is already existing",
    });
  } else {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    let user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();
    console.log("User Registered");
    const data = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({
      success: true,
      name: req.body.username,
      token,
    });
  }
});

//API for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({
    email: req.body.email,
  });
  if (user) {
    const comPass = req.body.password === user.password;
    if (comPass) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
        email: user.cartData,
      });
    } else {
      res.json({
        success: false,
        error: "Wrong Password",
      });
    }
  } else {
    res.json({
      success: false,
      error: "Email address is not existing",
    });
  }
});

//API for new collections
app.get("/newCollections", async (req, res) => {
  let products = await Product.find({});
  let newCollections = products.slice(1).slice(-8);
  res.send(newCollections);
});

//API for popular in women
app.get("/popularInWomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  let womenPopular = shuffled.slice(0, 4);
  res.send(womenPopular);
});

//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const authToken = req.body.authToken;
  if (!authToken) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(authToken, "secret_ecom");
      req.user = data.user;
      next();
    } catch (err) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

//API for saving cart data
app.post("/addToCart", fetchUser, async (req, res) => {
  const cart = req.body;
  console.log("Added", cart.itemId);
  const findUser = await Users.findOne({ _id: req.user.id });
  findUser.cartData[cart.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: findUser.cartData }
  );
  res.send("Added");
});

//API for remove cart data
app.post("/removeCart", fetchUser, async (req, res) => {
  const cart = req.body;
  console.log("Removed", cart.itemId);
  const findUser = await Users.findOne({ _id: req.user.id });
  if (findUser.cartData[cart.itemId] > 0) {
    findUser.cartData[cart.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: findUser.cartData }
    );
  }
  res.send("Removed");
});

app.post("/getCart", fetchUser, async (req, res) => {
  const findUser = await Users.findOne({ _id: req.user.id });
  res.send(findUser.cartData);
});

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server Running on Port: ${port}`);
  } else {
    console.log("Connection Failed");
  }
});
