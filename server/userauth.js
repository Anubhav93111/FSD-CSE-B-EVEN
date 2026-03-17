const express = require("express");
const app = express();

app.use(express.json());

let users = []; // temporary storage

// Register API
app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    // check if email already exists
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({
            message: "Email already registered"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password
    };

    users.push(newUser);

    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});