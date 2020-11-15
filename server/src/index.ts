import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createToken } from "./tokens";

require("dotenv").config();

const main = async () => {
  const app = express();
  const port = parseInt(process.env.PORT || "4000");

  app.use(bodyParser.json()); // for parsing application/json
  app.use(cors());

  app.listen(port, () => {
    console.log("server started on localhost:" + port);
  });

  app.post("/chat-token", function (req, res) {
    const identity = req.body.username;
    if (typeof identity === "string") {
      const token = createToken(identity);
      res.json({
        identity: identity,
        token: token.toJwt(),
      });
    } else {
      res.status(400).json({ error: "invalid identity" });
    }
  });
};

main().catch((err) => {
  console.error(err);
});
