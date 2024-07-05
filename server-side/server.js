const http = require("http");
const mysql = require("mysql");
const url = require("url");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "**********",
  database: "firstWebDatabase",
});

database.connect((err) => {
  if (err) {
    console.error("Terjadi error saat koneksi ke database: ", err.stack);
    return;
  }
  console.log("Koneksi ke database berhasil");
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/register") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, email, password } = JSON.parse(body);
      if (!username || !email || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Semua field harus diisi.",
          })
        );
        return;
      }
      const sql =
        "INSERT INTO users (username, email, password) VALUES (?,?,?)";
      database.query(sql, [username, email, password], (err, result) => {
        if (err) {
          console.error(
            "Error saat mengupload data user ke database: ",
            err.stack
          );
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message: "Terjadi kesalahan pada server.",
            })
          );
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ success: true, message: "Registrasi berhasil" })
        );
      });
    });
  } else if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { email, password } = JSON.parse(body);
      if (!email || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Email dan password harus diisi",
          })
        );
        return;
      }
      const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
      database.query(sql, [email, password], (err, result) => {
        if (err) {
          console.error("Error saat melakukan login: ", err.stack);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message: "Terjadi kesalahan pada server",
            })
          );
          return;
        }
        if (result.length > 0) {
          const user = {
            id: result[0].id,
            username: result[0].username,
            email: result[0].email,
          };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, user: user }));
        } else {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message: "Email atau password salah",
            })
          );
        }
      });
    });
  } else if (req.method === "GET" && req.url.startsWith("/search")) {
    const queryObject = url.parse(req.url, true).query;
    const searchTerm = queryObject.username || "";

    const sql = "SELECT * FROM users WHERE username LIKE ?";
    const searchValue = `%${searchTerm}%`;

    database.query(sql, [searchValue], (err, results) => {
      if (err) {
        console.error("Error saat melakukan pencarian ", err.stack);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Terjadi kesalahan pada server",
          })
        );
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, users: results }));
    });
  } else if (req.method === "POST" && req.url === "/upload-post") {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, "uploads"), // Set upload directory
      keepExtensions: true, // Keep file extension
      maxFileSize: 50 * 1024 * 1024, // Set maximum file size to 50MB
    });

    // Ensure the upload directory exists

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error saat mengupload file: ", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Terjadi kesalahan saat mengupload file",
          })
        );
        return;
      }

      const { caption, username } = fields;
      const imageFile = files.image ? files.image[0] : null; // Access the first element if it's an array

      if (!imageFile || !imageFile.filepath) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "File gambar harus diunggah.",
          })
        );
        return;
      }

      const imagePath = "uploads/" + path.basename(imageFile.filepath); // Get only the basename of the file path

      const sql =
        "INSERT INTO posts (image_path, caption, username) VALUES (?, ?, ?)";
      database.query(sql, [imagePath, caption, username], (err, result) => {
        if (err) {
          console.error("Error saat menyimpan postingan ke database: ", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message:
                "Terjadi kesalahan saat menyimpan postingan ke database.",
            })
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            message: "Postingan berhasil diunggah.",
          })
        );
      });
    });
    // Set a timeout for the request
  } else if (req.method === "GET" && req.url === "/posts") {
    const sql = "SELECT * FROM posts";
    database.query(sql, (err, results) => {
      if (err) {
        console.error("Error saat mengambil postingan: ", err.stack);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Terjadi kesalahan saat mengambil postingan.",
          })
        );
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, posts: results }));
    });
  } else if (req.method === "GET" && req.url.startsWith("/uploads/")) {
    const filePath = path.join(__dirname, req.url);
    fs.exists(filePath, (exists) => {
      if (!exists) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Not Found" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "image/jpg/png/" });
      fs.createReadStream(filePath).pipe(res);
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
