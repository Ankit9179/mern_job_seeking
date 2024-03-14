import app from "./app.js";
import { v2 as cloudinary } from "cloudinary";

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const port = process.env.PORT || 8080;

//listen app
app.listen(port, () => {
  console.log(`server is runnig on port ${process.env.PORT}`);
});
