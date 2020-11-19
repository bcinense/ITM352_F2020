var express = require("express");
var app = express();
var myParser = require("body-parser");
const fs = require("fs"); // Allows us to work with the file system, use const so you cannot change the variable, var if you want to change it
const { request, response } = require("express");
const { createSecurePair } = require("tls");
const filename = "user_data.json";

// Check if file exists before reading
if (fs.existsSync(filename)) {
  var stats = fs.statSync(filename);
  console.log(`user_data.json has ${stats.size} characters`);

  var data = fs.readFileSync(filename, "utf-8"); // When the file is executed it will read the data in the filename
  var users_reg_data = JSON.parse(data); // Parse data, which hold the contents of the objects
}
// if user exists, get their password
// if (typeof users_reg_data["dport"] != "undefined") {
//   console.log(users_reg_data["dport"]["password"]) == "xxx";
// }

// console.log(users_reg_data["dport"]["password"]); // users_reg_data.dport.password to retrieve a particular password

app.use(myParser.urlencoded({ extended: true }));

app.get("/register", function (request, response) {
  // Give a simple register form
  str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
  response.send(str);
});

app.post("/register", function (request, response) {
  // process a simple register form
  // validate the reg info

  // If all data is valid write to the user_data_filename and send to invoice

  // add an ex. new user reg info
  username = request.body.username; // use this for assignment to replace newuser with what the user typed in
  users_reg_data[username] = {}; //leave blank
  users_reg_data[username].password = request.body.password;
  users_reg_data[username].email = request.body.email;

  // write updated object to user_reg_info
  reg_info_str = JSON.stringify(users_reg_data);
  // will read the new data, parse it and read the new user info
  fs.writeFileSync(filename, reg_info_str);
});

app.get("/login", function (request, response) {
  // Give a simple login form
  str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
  response.send(str);
});

app.post("/login", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.body);
});

app.listen(8080, () => console.log(`listening on port 8080`));

// // if user exists, get their password
// if (typeof users_reg_data[request.body.username] != "undefined") {
//   if (request.body.password == users_reg_data[request.body.username].password) {
//     response.send(`Thank you for ${request.body.username} logging in`);
//   } else {
//     response.send(
//       `Hey! ${request.body.password} does not match what we have for you`
//     );
//   }
// } else {
//   response.send(`Hey! ${request.body.username} does not exist`);
// }

//validate email check on the server!!
