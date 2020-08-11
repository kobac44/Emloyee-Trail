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
        'Add Employee',
        'View All Employees',
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
      case 'Add Employee':
        addEmployee();
        break;

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
function addEmployee() {
  let listNames = ["None"];
  connection.query('select first_name from employee', function (err, data) {
    if (err);
    for (let i = 0; i < data; i++) {
      listNames.push(data[i].first_name);
    }

  })
  inquirer.prompt([
    {
      name: 'first',
      type: 'input',
      message: 'Enter the first name of the employee',
    },
    {
      name: 'last',
      type: 'input',
      message: 'Enter the last name',

    },
    {
      name: 'erole',
      type: 'list',
      message: 'What is employee role?',
      choices: [
        'Software Engineer',
        'Software Tester',
        'Lead Engineer',
        'Sales Lead',
        'Sales Person',
        'Lawyer'
      ]
    },
    {
      name: 'managerName',
      type: 'list',
      message: 'Who is the employee manager?',
      choices: listNames
    }

  ]).then(function (response) {
    connection.query(`INSERT INTO addEmployee CONCAT(manager.first_name, ' ', manager.last_name) AS manage values (select id from role where title=?),(select id from employee e where e.first_name=?))`, [response.first, response.last, response.erole, response.managerName],
      function (err, result) {
        console.log(result);
      })
  })
}
runChoices();