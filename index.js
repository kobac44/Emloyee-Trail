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
        'Add Employee',
        'Remove Employee',
        'Add Employee Role',
        'Delete Employee Role',
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

      case 'Add Employee':
        addEmployee();
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

      case 'exit':
        console.log("SEE YA!!");
        connection.end();
        break;
    }
  });
}
// FUNCTIONS BASED ON USER SELECTION
// ----------------------------------
function viewAllEmployees() {
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;";
  connection.query(query, function (err, res) {
    if (err);
    for (var i = 0; i < res.length; i++) {
      console.log("Id: " + res[i].id + " Name: " + res[i].first_name + " " + res[i].last_name + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Dept: " + res[i].name);
    }
  })

};
runChoices();