const mysql = require("mysql");
const inquirer = require("inquirer");
const const_table = require("console.table");


// MySQL DB Connection Information (remember to change this with your specific credentials)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "p_e-@rT11MS#",
  database: "employeeTrails__db",
});
connection.connect((err) => {
  if (err) throw err;
  startemployeeTrails();
});

function startemployeeTrails() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "Add Employees", "Update Employees", "View Roles", "Add Roles", "Update Roles", "View Dept Roles",
        "Add Dept", "View Dept Sal"
      ]
    }).then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          searchViewEmployees();
          break;

        case "Add Employees":
          searchAddEmployees();
          break;

        case "Update Employees":
          searchUpdateEmployess();
          break;

        case "View Roles":
          searchViewRoles();
          break;

        case "Add Roles":
          searchAddRoles();

        case "Update Roles":
          searchUpdateRoles();

        case "View Dept Roles":
          searchViewDepartmentRoles();
          break;

        case "Add Dept":
          searchAddDepartments();
          break;

        case "View Dept Sal":
          ViewDeptSal();
          break;
      }
    })

}

function searchEmployeesData() {
  inquirer
    .prompt({
      name: "employeeData",
      type: "list",
      message: "what would you like to do?",
      choices: ["View All Employees?",]

    })
}





// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
