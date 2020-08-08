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
      choices: ["View", "Add", "Update", "Remove Employees", "View Roles", "Add Roles", "Update Roles", "View Dept Roles",
        "Add Dept", "View Dept Sal"
      ]
    }).then((answer) => {
      switch (answer.action) {
        case "View, Add, Update, Remove All Employees":
          searchEmployeesData();
          break;

        case "View Roles":
          searchRoles();
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
      name: "employeesData",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees?", "Add Employees?",
        "View All Employees by Department?", "View All Employees by Manager?", "Update Employees?", "Remove Employee?",

      ]

    }).then((answer) => {
      switch (answer.employeeData) {
        case "View All Employees?":
          viewEmployees();
          break;

        case "Add Employees?":
          addemployees();
          break;

        case "View All Employees by Department?":
          employeesbyDepartment();
          break;

        case "View All Employees by Manager?":
          employessbyManage();
          break;

        case "Update Employees?":
          updateEmployees();
          break;

        case "Remove Employee?":
          removeEmployee();
          break;

      }
    });
}

function searchRoles() {
  inquirer
    .prompt({
      name: "Roles",
      type: "list",
      message: "What would you like to do?",

    })
}

