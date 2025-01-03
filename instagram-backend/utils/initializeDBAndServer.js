const mongoose = require("mongoose");

const initializeDBAndServer = async (app) => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failure");
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started and listens on http://localhost:${PORT}`);
  });
};

module.exports = initializeDBAndServer;
