const { connectDB } = require("./config/database");
const { app } = require("./app");

const port = process.env.PORT || 3001;

connectDB()
  .then(() => {
    console.log("✅ Database connection established...");
    app.listen(port, () => {
      console.log(`🚀 Server is running successfully on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database cannot be connected!!", err);
  });