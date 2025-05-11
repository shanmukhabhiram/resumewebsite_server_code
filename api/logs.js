// const fs = require("fs");
// const path = require("path");

// const LOG_FILE = path.resolve(__dirname, "../logs.json");

// function getLogs() {
//   if (!fs.existsSync(LOG_FILE)) return [];
//   const data = fs.readFileSync(LOG_FILE);
//   return JSON.parse(data);
// }

// function saveLogs(logs) {
//   fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
// }

// module.exports = async (req, res) => {
//   if (req.method === "GET") {
//     const logs = getLogs();
//     res.status(200).json(logs);
//   } else if (req.method === "POST") {
//     const body = req.body;
//     const logs = getLogs();
//     logs.push(body);
//     saveLogs(logs);
//     res.status(201).json({ message: "Log saved" });
//   } else if (req.method === "DELETE") {
//     saveLogs([]);
//     res.status(200).json({ message: "All logs cleared" });
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// };

// api/logs.js
let logs = [];

module.exports = async (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(logs);
  } else if (req.method === "POST") {
    try {
      let body = '';
      for await (const chunk of req) {
        body += chunk;
      }
      const data = JSON.parse(body);
      logs.push(data);
      res.status(201).json({ message: "Log saved" });
    } catch (err) {
      res.status(400).json({ error: "Invalid JSON" });
    }
  } else if (req.method === "DELETE") {
    logs = [];
    res.status(200).json({ message: "All logs cleared" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};