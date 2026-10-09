const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./database");
const rootRouter = require("./routes/index");
const { setUpEvents } = require("./events");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", rootRouter);

// Initialize events & DB
setUpEvents();
connectToMongoDB();

// Explicitly bind to 0.0.0.0 so Docker can forward host traffic
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT} (listening on 0.0.0.0)`);
});