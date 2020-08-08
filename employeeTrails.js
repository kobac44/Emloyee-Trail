const mysql = require("mysql");
const inquirer = require("inquirer");
const const_table = require("console.table");


// MySQL DB Connection Information (remember to change this with your specific credentials)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345",
  database: "employeeTrails_db",
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
      choices: ["View", "Add", "Update", "Remove Employees", "View Roles", "Add Roles", "Update Roles", "View, Add, Remove Dept", "View Dept Salary",]
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

        case "View, Add, Remove Dept":
          deptData();
          break;

        case "View Dept Sal":
          searchDeptSalary();
          break;
      }
    });

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
      choices: ["View All Roles?", "Add a Role?", "Remove a Role?",]

    }).then((answer) => {
      switch (answer.Roles) {
        case "View All Roles?":
          viewRoles();
          break;

        case "Add a Role?":
          addRole();
          break;

        case "Remove a Role?":
          deleteRole();
          break;
      }
    });
}

function deptData() {
  inquirer
    .prompt({
      name: "deptData",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Departments?", "Add a Department?", "Remove a Department?", "View Dept Sal?",]

    }).then((answer) => {
      switch (answer.deptData) {
        case "View All Departments?":
          viewDepts();
          break;

        case "Add a Department":
          addDept();
          break;

        case "Remove a Department?":
          deleteDept();
          break;

        case "View Dept Sal?":
          viewSalary();
          break;
      }
    });
}
