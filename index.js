const mysql = require('mysql');
const inquirer = require('inquirer');
// Cross-tabulation for a pair of categorical variables (or factors) with either row, column, or total proportions, as well as marginal sums.
const cTable = require("console.table");


const connection = mysql.createConnection({
  host: 'localhost',
  port: "3306",
  user: 'root',
  password: '',
  database: 'employees',
});

function runChoices() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Add Employee Role',
        'View Department',
        'View Role',
        'Update Employee Roles'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Employee Role':
          addEmployeeRole();
          break;

        case 'View Department':
          viewByDepartment();
          break;

        case 'View Role':
          viewRole();
          break;

        case 'Update Employee Roles':
          updateRole();
          break;

        case 'EXIT':
          connection.end();
          break;

      }
    });
}

// function that displays all the names, titles, roles salary, and department
function viewAllEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;",
    function (err, res) {
      if (err);
      for (var i = 0; i < res.length; i++) {
        console.log("Id: " + res[i].id + " Name: " + res[i].first_name + " " + res[i].last_name + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || department: " + res[i].name);
      };
      runChoices();
    });

};
runChoices();


// Add Emloyee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please enter employees first name:",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please enter employees last name:",
      },
      {
        type: 'number',
        message: 'what is the role ID of the new employee?',
        name: 'role_id'
      },
      {
        type: 'number',
        message: 'what is the manager ID of the new employee?',
        name: 'manager_id'
      }
    ])
    .then(answer => {
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
      connection.query(query, function (err, res) {
        if (err) throw err
        console.table(res)
        runChoices();
      })

    })
}


//Add Employee Role
function addEmployeeRole() {
  let roles = [];
  connection.query('SELECT title from role', function (err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      roles.push(data[i].title);
    }

    inquirer.prompt([
      {
        name: 'title',
        type: 'list',
        message: 'What is employee role?',
        choices: roles
      },
      {
        name: 'salary',
        type: 'list',
        message: 'Enter the salary',
        choices: ['100000', '80000', '150000', '120000', '160000', '125000', '250000', '190000']

      },
      {
        name: 'departmentName',
        type: 'input',
        message: 'Enter the department name',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal']
      },
    ]).then(answer => {
      console.log(answer.department);
      const query = `SELECT id FROM department WHERE name = "${answer.department}";`;
      connection.query(query, function (err, res) {
        if (err) throw err;

        connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answer.title}", ${answer.salary}, ;`, function (err, res) {
          console.log("** Role Created **")
        });
      })
      runChoices();
    });
  })
}

// View Employee By Department
function viewByDepartment() {
  console.log("View Departments:");
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.log(results)
    runChoices();
  })
}

// 'View Roles'
function viewRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    runChoices();
  })
}

// Update Employee Roles
function updateRole() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Please type in name of new role"

      },
      {
        name: "id",
        type: "input",
        message: "What id postion is your new role in"

      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of new role?",
      },
      {
        name: "department_id",
        type: "list",
        message: "Which department is the new role in?",
        choices: ['Sales', 'Engineering', 'Finance', 'Legal']
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: response.name,
          salary: response.salary,
          id: response.id,
          department_id: response.id
        },
        function (error, _response) {
          console.log(response);
          if (error) throw error;
        }
      );
    })
    .then(function () {
      console.log(`--This role has been added!--`);
    })
    .then(function () {
      runChoices();

    });
}
