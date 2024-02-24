import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGOO_URL, { dbName: "MERN_JOB_SKEEING" })
    .then(() => {
      console.log(
        `database connection successfuly done with ${process.env.MONGOO_URL}`
      );
    })
    .catch((err) => {
      console.log(`some error while connection database ${err}`);
    });
};
