const express = require("express");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const secretKey = "anamarisa1";
const users = [];

// Allow all origins for testing purposes (adjust this in production)
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Serve the React app's static files
app.use(express.static(path.join(__dirname, "build")));

// Handle all other routes by serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });

    const token = jwt.sign({ username }, secretKey, { expiresIn: "6h" });

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Login failed" });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "6h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
