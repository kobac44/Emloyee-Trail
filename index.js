const mysql = require('mysql');
const inquirer = require('inquirer');
// const cTable = require("console.table");


const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",

  user: 'root',
  password: '12345',
  database: 'employeeTrails'
});

function runChoices() {

  console.log("Connected to the database!");
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Remove Employee',
        'Add Employee Role',
        'View Employee Role',
        'Add Employee By Department',
        'View Employee By Department',
        'Delete Employee by Department',
        'Update Employee Roles'
      ]
    }
  ]).then(function (answer) {
    switch (answer.action) {
      case 'View All Employees':
        viewAllEmployees();
        break;

      case 'Remove Employee':
        removeEmployee();
        break;

      case 'Add Employee Role':
        addRole();
        break;

      case 'View Employee Role':
        viewRole();
        break;

      case 'Add Employee By Department':
        addDepartment();
        break;

      case 'View Employee by Department':
        viewDepartment();
        break;

      case 'Update Employee Role':
        updateRoll();
        break;

      case 'Delete Employee Role':
        deleteRole();
        break;

      case 'Delete Employee by Department':
        deleteDepartment();
        break;

      // case 'exit':
      //   console.log("SEE YA!!");
      //   connection.end();
      //   break;
    }
  });
}

runChoices();