import mongoose from "mongoose";

mongoose
  .connect(import.meta.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongoose;
