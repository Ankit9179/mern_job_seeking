import app from "./app.js";

//listen app
app.listen(process.env.PORT, () => {
  console.log(`server is runnig on port ${process.env.PORT}`);
});
