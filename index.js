const mysql = require('mysql');
const inquirer = require('inquirer');
// Cross-tabulation for a pair of categorical variables (or factors) with either row, column, or total proportions, as well as marginal sums.
const cTable = require("console.table");


const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",

  user: 'root',
  password: '12345',
  database: 'employees_db',
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
        'View Employee Role',
        'Add Employee By Department',
        'View Department',
        'Delete Employee by Department'
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

      case 'Add Employee Role':
        addRole();
        break;

      case 'View Employee Role':
        viewRole();
        break;

      case 'Add Employee By Department':
        addDepartment();
        break;

      case 'View Department':
        viewDepartment();
        break;

      case 'Delete Employee Role':
        deleteRole();
        break;
    }
  });
};

// function that displays all the names, titles, roles salary, and department
function viewAllEmployees() {
  console.log("Viewing Employees\n");

  var query = `SELECT * all employee data, employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
  connection.query(query, function (err, res) {
    if (err);

    console.table(res);
    console.log("Viewing SEEN!!\n");

  });
};
runChoices();

// Displays all employees by department: improve by making a loop that picks up department names
function viewDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "What department's employees would you like to see?",
      choices: ["Sales", "Engineering", "Finance", "Legal"],
    })
    .then(function (answer) {
      const query =
        "SELECT employee.first_name, employee.last_name " +
        "FROM employee " +
        "INNER JOIN role " +
        "ON employee.role_id=role.id " +
        "INNER JOIN department " +
        "ON role.department_id=department.id " +
        "WHERE department.name='" +
        answer.department +
        "';";
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runChoice();
      });
    });
}
