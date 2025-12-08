import express from "express";
import routes from "./routes";

const app = express();

const middleware = (req, res, next) => {
    const Authorization = req.headers["authorization"];
    if (!Authorization || Authorization !== "mysecretkey") {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

app.use(middleware);
app.use(express.json());
app.use("/api", routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;