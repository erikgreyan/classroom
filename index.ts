import express, { Application, Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
// ------ Config ------
import { PORT, SESSION_SECRET } from "./src/config/config";
// ------ Database ------
import database from "./src/db/database";
// ------ Routers ------
import homeRouter from "./src/router/homeRouter";
import schedulesRouter from "./src/router/schedulesRouter";

(async function () {
    const app: Application = express();
    app.use(
        cors({
            origin: "*",
            credentials: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        })
    );
    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use(express.static("public"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));

    database(); // Database start

    app.use("/", homeRouter);
    app.use("/api/schedules", schedulesRouter);
    app.use("/*", (req: Request, res: Response) => {
        res.status(404).send({ message: "404 Not Found" });
    });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}⚡`));
})();
