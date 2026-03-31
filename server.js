import "dotenv/config";
import express from "express";
import connection from "./config/connectDB";
import configViewEngine from "./config/configEngine";
import winGoController from "./controllers/winGoController";
import k5Controller from "./controllers/k5Controller";
import k3Controller from "./controllers/k3Controller";
import routes from "./routes/web";
import cronJobContronler from "./controllers/cronJobContronler";
import socketIoController from "./controllers/socketIoController";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import { fileURLToPath } from "url";
import http from "http";
import fs from "fs";
import { Server } from "socket.io";
require("./instrument.js");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const logFilePath = path.join(__dirname, "server.log");

// Helper function to log to file
function logToFile(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${timestamp}] ${message}\n`, "utf8");
}

// Socket IO setup with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust to your actual client if needed
    // origin: "/", // Adjust to your actual client if needed
    methods: ["GET", "POST"],
  },
});

// Log when a client connects or disconnects
io.on("connection", (socket) => {
  //logToFile(`Socket connected - ID: ${socket.id}`);

  socket.on("disconnect", () => {
    //logToFile(`Socket disconnected - ID: ${socket.id}`);
  });
});

// Middleware for logging HTTP requests
app.use((req, res, next) => {
  //logToFile(`Request received - PID: ${process.pid}, Method: ${req.method}, URL: ${req.url}`);
  next();
});

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware for static files
app.use(express.static(path.join(__dirname, "public")));

// Disable cache
app.options("*", cors());
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Surrogate-Control", "no-store");
  next();
});

// Middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.JWT_ACCESS_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Set up view engine
configViewEngine(app);

// Set up routes
routes.initWebRouter(app);

// Log socket message for admin
socketIoController.sendMessageAdmin(io);
//logToFile('Socket message to admin sent');

// Serve client-side React application
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// Countdown logic for typeid1 === 1
let countdown = 60;
let winGoTriggered = false;
let winGoRunning = false;

const countdownInterval = setInterval(async () => {
  // Calculate minutes and seconds
  const minute = Math.floor(countdown / 60);
  const secondtime1 = Math.floor((countdown % 60) / 10);
  const secondtime2 = countdown % 10;

  io.emit("timeUpdate_11", { minute, secondtime1, secondtime2 });
  ////logToFile(`Countdown emitted - Minute: ${minute}, Second1: ${secondtime1}, Second2: ${secondtime2}`);

if(countdown===59){
      winGoRunning = false; 
}
  // When countdown reaches 5, trigger winGo logic if not already triggered
  if (countdown === 5 && !winGoTriggered) {
    winGoTriggered = true;

    if (!winGoRunning) {
      winGoRunning = true;
      //logToFile('Starting winGo logic');

      try {
        // Wait for winGo logic to complete
        await winGoController.addWinGo("11");
        await winGoController.handlingWinGo1P("11");

        // wingo crons
        await winGoController.addWinGo(1);
        await winGoController.handlingWinGo1P(1);

        // 5d crons
        await k5Controller.add5D(1);
        await k5Controller.handling5D(1);

        // k3 crons
        await k3Controller.addK3(1);
        await k3Controller.handlingK3(1);

        //logToFile('winGo logic executed successfully');
      } catch (error) {
        console.error("Error in winGo logic:", error);
        //logToFile(`Error in winGo logic: ${error.message}`);
      } finally {
        winGoRunning = false;
      }
    }
  }

  // Decrement countdown
  countdown--;
  if (countdown === 0) {
    countdown = 60;
    winGoTriggered = false;

    try {
      // Wait for winGoController to finish if still running
      while (winGoRunning) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // trx socket
      const [winGo11] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "trx" ORDER BY `id` DESC LIMIT 2'
      );
      io.emit("data-server-trx", { data: winGo11 });
      io.emit("data-server-trx-1", { data: winGo11 });

      // wingo socket
      const [winGo1] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "wingo" ORDER BY `id` DESC LIMIT 2'
      );
      io.emit("data-server", { data: winGo1 });
      io.emit("data-server-1", { data: winGo1 });

      // 5d socket
      const [k5D] = await connection.execute(
        "SELECT * FROM 5d WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2"
      );
      io.emit("data-server-5d", { data: k5D, game: "1" });
      io.emit("data-server-5d-1", { data: k5D, game: "1" });

      // k3 socket
      const [k3] = await connection.execute(
        "SELECT * FROM k3 WHERE `game` = 1 ORDER BY `id` DESC LIMIT 2"
      );
      io.emit("data-server-k3", { data: k3, game: "1" });

      //logToFile('Data fetched and emitted successfully');
    } catch (error) {
      console.error("Error fetching wingo data:", error);
      //logToFile(`Error fetching data: ${error.message}`);
    }
  }
}, 1000);

let countdown_3 = 180; // Initial countdown (in seconds)
let winGoTriggered_3 = false; // Flag to track if winGo logic has been triggered

let winGoRunning_3 = false;

const countdownInterval_3 = setInterval(async () => {
  // Calculate minutes and seconds
  const minute_3 = Math.floor(countdown_3 / 60);
  const secondtime1_3 = Math.floor((countdown_3 % 60) / 10);
  const secondtime2_3 = countdown_3 % 10;

  // Emit countdown to all clients
  io.emit("timeUpdate_3", {
    minute: minute_3,
    secondtime1: secondtime1_3,
    secondtime2: secondtime2_3,
  });
if(countdown_3===179){
      winGoRunning_3 = false; 
}
  // When countdown reaches 5, trigger winGo logic if not already triggered
  if (countdown_3 === 5 && !winGoTriggered_3) {
    winGoTriggered_3 = true; // Set the flag to true to prevent re-triggering

    if (!winGoRunning_3) {
      winGoRunning_3 = true; // Set running flag
      try {
        // Wait for winGo logic to complete
        await winGoController.addWinGo(3);
        await winGoController.handlingWinGo1P(3);

        // wingo crons
        await winGoController.addWinGo("33");
        await winGoController.handlingWinGo1P("33");

        // 5d crons
        await k5Controller.add5D(3);
        await k5Controller.handling5D(3);

        // k3 crons
        await k3Controller.addK3(3);
        await k3Controller.handlingK3(3);
      } catch (error_3) {
        console.error("Error in winGo logic:", error_3);
      } finally {
        winGoRunning_3 = false; // Reset running flag when done
      }
    }
  }

  // Decrement countdown
  countdown_3--;

  // When countdown reaches 0, fetch data only if winGo logic has completed
  if (countdown_3 === 0) {
    countdown_3 = 180;
    winGoTriggered_3 = false;

    try {
      // Wait for winGoController to finish if it's still running
      if (winGoRunning_3) {
        while (winGoRunning_3) {
          await new Promise((resolve_3) => setTimeout(resolve_3, 100)); // Polling until winGoRunning is false
        }
      }

      // this is trx socket
      // Fetch the latest wingo data after winGoController logic has run
      const [winGo11_3] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "trx3" ORDER BY `id` DESC LIMIT 2',
        []
      );
      const data11_3 = winGo11_3; // Cầu mới chưa có kết quả
      io.emit("data-server-trx", { data: data11_3 });

      // this is wingo socket
      const [winGo1_3] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "wingo3" ORDER BY `id` DESC LIMIT 2 ',
        []
      );
      const data_3 = winGo1_3; // Cầu mới chưa có kết quả
      io.emit("data-server", { data: data_3 });

      // 5d socket
      const [k5D_3] = await connection.execute(
        "SELECT * FROM 5d WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ",
        []
      );
      const data2_3 = k5D_3; // Cầu mới chưa có kết quả
      io.emit("data-server-5d", { data: data2_3, game: "3" });

      // k3 socket
      const [k3_3] = await connection.execute(
        "SELECT * FROM k3 WHERE `game` = 3 ORDER BY `id` DESC LIMIT 2 ",
        []
      );
      const data3_3 = k3_3; // Cầu mới chưa có kết quả
      io.emit("data-server-k3", { data: data3_3, game: "3" });
    } catch (error_3) {
      console.error("Error fetching wingo data:", error_3);
    }
  }
}, 1000);

// Countdown logic for typeid5 === 5
let countdown_5 = 300; // Initial countdown (in seconds)
let winGoTriggered_5 = false; // Flag to track if winGo logic has been triggered
let winGoRunning_5 = false;

const countdownInterval_5 = setInterval(async () => {
  // Calculate minutes and seconds
  const minute_5 = Math.floor(countdown_5 / 60);
  const secondtime1_5 = Math.floor((countdown_5 % 60) / 10);
  const secondtime2_5 = countdown_5 % 10;

  // Emit countdown to all clients
  io.emit("timeUpdate_5", {
    minute: minute_5,
    secondtime1: secondtime1_5,
    secondtime2: secondtime2_5,
  });

if(countdown_5===299){
      winGoRunning_5 = false; 
}
  // When countdown reaches 5, trigger winGo logic if not already triggered
  if (countdown_5 === 5 && !winGoTriggered_5) {
    winGoTriggered_5 = true;

    if (!winGoRunning_5) {
      winGoRunning_5 = true;
      try {
        // WinGo logic for trx 5
        await winGoController.addWinGo(5);
        await winGoController.handlingWinGo1P(5);

        // Additional cron logic
        await winGoController.addWinGo("55");
        await winGoController.handlingWinGo1P("55");

        await k5Controller.add5D(5);
        await k5Controller.handling5D(5);

        await k3Controller.addK3(5);
        await k3Controller.handlingK3(5);
      } catch (error_5) {
        console.error("Error in winGo logic:", error_5);
      } finally {
        winGoRunning_5 = false;
      }
    }
  }

  // Decrement countdown
  countdown_5--;

  // When countdown reaches 0, fetch data only if winGo logic has completed
  if (countdown_5 === 0) {
    countdown_5 = 300;
    winGoTriggered_5 = false;

    try {
      if (winGoRunning_5) {
        while (winGoRunning_5) {
          await new Promise((resolve_5) => setTimeout(resolve_5, 100));
        }
      }

      // Fetch data for trx 5
      const [winGo11_5] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "trx5" ORDER BY `id` DESC LIMIT 2',
        []
      );
      const data11_5 = winGo11_5;
      io.emit("data-server-trx", { data: data11_5 });

      const [winGo1_5] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "wingo5" ORDER BY `id` DESC LIMIT 2',
        []
      );
      const data_5 = winGo1_5;
      io.emit("data-server", { data: data_5 });

      const [k5D_5] = await connection.execute(
        "SELECT * FROM 5d WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2",
        []
      );
      const data2_5 = k5D_5;
      io.emit("data-server-5d", { data: data2_5, game: "5" });

      const [k3_5] = await connection.execute(
        "SELECT * FROM k3 WHERE `game` = 5 ORDER BY `id` DESC LIMIT 2",
        []
      );
      const data3_5 = k3_5;
      io.emit("data-server-k3", { data: data3_5, game: "5" });
    } catch (error_5) {
      console.error("Error fetching wingo data:", error_5);
    }
  }
}, 1000);

// Countdown logic for typeid10 === 10
let countdown_10 = 600; // Initial countdown (in seconds)
let winGoTriggered_10 = false; // Flag to track if winGo logic has been triggered
let winGoRunning_10 = false;

const countdownInterval_10 = setInterval(async () => {
  // Calculate minutes and seconds
  const minute_10 = Math.floor(countdown_10 / 60);
  const secondtime1_10 = Math.floor((countdown_10 % 60) / 10);
  const secondtime2_10 = countdown_10 % 10;

  // Emit countdown to all clients
  io.emit("timeUpdate_10", {
    minute: minute_10,
    secondtime1: secondtime1_10,
    secondtime2: secondtime2_10,
  });

if(countdown_10===599){
      winGoRunning_10 = false; 
}
  // When countdown reaches 5, trigger winGo logic if not already triggered
  if (countdown_10 === 5 && !winGoTriggered_10) {
    winGoTriggered_10 = true;

    if (!winGoRunning_10) {
      winGoRunning_10 = true;
      try {
        // WinGo logic for trx 10
        await winGoController.addWinGo(10);
        await winGoController.handlingWinGo1P(10);

        await k5Controller.add5D(10);
        await k5Controller.handling5D(10);

        await k3Controller.addK3(10);
        await k3Controller.handlingK3(10);
      } catch (error_10) {
      } finally {
        winGoRunning_10 = false;
      }
    }
  }

  // Decrement countdown
  countdown_10--;

  // When countdown reaches 0, fetch data only if winGo logic has completed
  if (countdown_10 === 0) {
    countdown_10 = 600;
    winGoTriggered_10 = false;

    try {
      if (winGoRunning_10) {
        while (winGoRunning_10) {
          await new Promise((resolve_10) => setTimeout(resolve_10, 100));
        }
      }

      // Fetch data for trx 10
      const [winGo11_10] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "trx10" ORDER BY `id` DESC LIMIT 2',
        []
      );
      const data11_10 = winGo11_10;
      io.emit("data-server-trx", { data: data11_10 });

      const [winGo1_10] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "wingo10" ORDER BY `id` DESC LIMIT 2',
        []
      );
      const data_10 = winGo1_10;
      io.emit("data-server", { data: data_10 });

      const [k5D_10] = await connection.execute(
        "SELECT * FROM 5d WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2",
        []
      );
      const data2_10 = k5D_10;
      io.emit("data-server-5d", { data: data2_10, game: "10" });

      const [k3_10] = await connection.execute(
        "SELECT * FROM k3 WHERE `game` = 10 ORDER BY `id` DESC LIMIT 2",
        []
      );
      const data3_10 = k3_10;
      io.emit("data-server-k3", { data: data3_10, game: "10" });
    } catch (error_10) {
      console.error("Error fetching wingo data:", error_10);
    }
  }
}, 1000);

let countdown_30 = 30; // Initial countdown (in seconds) for 30 minutes
let winGoTriggered_30 = false; // Flag to track if winGo logic has been triggered

let winGoRunning_30 = false;

const countdownInterval_30 = setInterval(async () => {
  // Calculate minutes and seconds
  const minute_30 = Math.floor(countdown_30 / 60);
  const secondtime1_30 = Math.floor((countdown_30 % 60) / 10);
  const secondtime2_30 = countdown_30 % 10;

  // Emit countdown to all clients
  io.emit("timeUpdate_30", {
    minute: minute_30,
    secondtime1: secondtime1_30,
    secondtime2: secondtime2_30,
  });

if(countdown_30===29){
      winGoRunning_30 = false; 
}

  // When countdown reaches 5, trigger winGo logic if not already triggered
  if (countdown_30 === 5 && !winGoTriggered_30) {
    winGoTriggered_30 = true; // Set the flag to true to prevent re-triggering

    if (!winGoRunning_30) {
      winGoRunning_30 = true; // Set running flag
      try {
        await winGoController.addWinGo(10);
        await winGoController.handlingWinGo1P(10);
      } catch (error_30) {
        console.error("Error in winGo logic for 30:", error_30);
      } finally {
        winGoRunning_30 = false; // Reset running flag when done
      }
    }
  }

  // Decrement countdown
  countdown_30--;

  // When countdown reaches 0, fetch data only if winGo logic has completed
  if (countdown_30 === 0) {
    countdown_30 = 30; // Reset countdown to 30 minutes
    winGoTriggered_30 = false;

    try {
      // Wait for winGoController to finish if it's still running
      if (winGoRunning_30) {
        while (winGoRunning_30) {
          await new Promise((resolve_30) => setTimeout(resolve_30, 100)); // Polling until winGoRunning is false
        }
      }

      // this is trx socket for 30
      // Fetch the latest wingo data after winGoController logic has run
      const [winGo11_30] = await connection.execute(
        'SELECT * FROM `wingo` WHERE `game` = "wingo10" ORDER BY `id` DESC LIMIT 2',
        []
      );
      const data11_30 = winGo11_30; // New data
      io.emit("data-server", { data: data11_30 });
    } catch (error_30) {
      console.error("Error fetching wingo data for 30:", error_30);
    }
  }
}, 1000);

const port = process.env.PORT || 5505;
server.listen(port, () => {
  //logToFile(`Server running on port ${port} - PID: ${process.pid}`);
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown on SIGINT
process.on("SIGINT", () => {
  console.log("Received SIGINT. Shutting down server gracefully.");
  clearInterval(countdownInterval);
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

// Error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  //logToFile(`Uncaught Exception - Error: ${err.stack}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  //logToFile(`Unhandled Rejection - Error: ${reason.stack}`);
});

//logToFile(`Starting application with PID: ${process.pid}`);
