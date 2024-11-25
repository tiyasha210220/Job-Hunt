import mongoose from "mongoose";
import validator from "validator";

export const DbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "JOB-HUNT-PORTAL" ,
        })
        .then(() => {
            console.log("connected to database!");
        })
        .catch((err) => {
            console.log(`some error occured while connecting to database: ${err}`);
        });
};