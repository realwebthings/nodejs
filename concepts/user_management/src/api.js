import express from "express";
import routes from "../routes/index.js";

const app = express();

app.use(express.json());
app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
