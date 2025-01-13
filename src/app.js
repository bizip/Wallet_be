import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

const start = () => {
    try {
      app.listen({ port: PORT }, () =>
        process.stdout.write(`http://localhost:${PORT} \n`)
      );
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  };
  
  start();