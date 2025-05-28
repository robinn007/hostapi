require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();

// Configure CORS to allow requests from your frontend origin
app.use(cors({
     origin: /^http:\/\/localhost:\d+$/, // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
}));

app.use(express.json());
const connectDB = require("./db/connect");

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

app.get("/", (req, res) => {
    res.send("Hi, I am live");
});

// Middleware to set router
app.use("/api/products", products_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I am connected`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
