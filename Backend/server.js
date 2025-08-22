const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const seedRecipes = require('./seed/seedRecipes');
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: "https://enbla-recipe-sharing-app.netlify.app",
  credentials: true, // allow cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow these methods
  allowedHeaders: ["Content-Type", "Authorization"], // allow these headers
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Request logging middleware
app.use((req, res, next) => {
  console.log(` ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);

// Redirect root to frontend
// app.get("/", (req, res) => {
//   res.redirect("https://enbla-recipe-sharing-app.netlify.app/");
// });

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to DB and seed
connectDB()
  .then(() => {
    console.log("MongoDB Connected");
    if (typeof seedRecipes === "function") {
      seedRecipes();
    }
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? ' Set' : ' Missing'}`);
});
