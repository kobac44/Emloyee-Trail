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
        name: "first_name",
        type: "input",
        message: "What is the new employee's firts name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "role_id",
        type: "input",
        message: "Please set the employee's role id?"
      },
      {
        name: "manager_id",
        type: "input",
        message: "If the employee has a manager please assign Manager , 1,3,5 or 7 = id",

        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }

    ])
    .then(function (answerA) {
      // when finished prompting, insert a new item into the db
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answerA.first_name,
          last_name: answerA.last_name,
          role_id: answerA.role_id || 0,
          manager_id: answerA.manager_id || 0
        },
        function (err) {
          if (err) throw err;
          console.log("Your new Employee was added successfully!");

          runChoices();

        }
      );
    })

}

//Add Employee Role
function addEmployeeRole(_data) {
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
      )
    })
    .then(function () {
      console.log(`--This role has been added!--`);
    })
    .then(function () {
      runChoices();
    });
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
        message: "What is the salary of new role?"
      },
      {
        name: "department_id",
        type: "list",
        message: "Which department is the new role in?"
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
