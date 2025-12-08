import validator from "validator";

const validateUser = (req, res, next) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (!username || username.trim() === "") {
        return res.status(400).json({ message: "Invalid username" });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    next();
};

const validateUserUpdate = (req, res, next) => {
    const { username, password, email } = req.body;

    if (username !== undefined && (!username || username.trim() === "")) {
        return res.status(400).json({ message: "Invalid username" });
    }

    if (password !== undefined && (!password || password.length < 6)) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (email !== undefined && !validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    next();
};

export { validateUser, validateUserUpdate };
