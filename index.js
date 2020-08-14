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
        'Add Employee By Department',
        'View Employee Role',
        'View Department',
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
          addRole();
          break;

        case 'Add Employee By Department':
          addDepartment();
          break;

        case 'View Employee Role':
          viewRole();
          break;

        case 'View Department':
          viewDepartment();
          break;

        case 'Update Employee Roles':
          updateRoles();
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
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log("Id: " + res[i].id + " Name: " + res[i].first_name + " " + res[i].last_name + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Dept: " + res[i].name);
      };
      runChoices();
    });

};
runChoices();






// // Add Emloyee
// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         name: "firstName",
//         type: "input",
//         message: "Please enter employees first name:",
//       },
//       {
//         name: "lastName",
//         type: "input",
//         message: "Please enter employees last name:",
//       },
//       {
//         name: "jobID",
//         type: "input",
//         message: "Please enter the job ID:",
//       },
//       {
//         name: "role",
//         type: "list",
//         message: "What is the employee's role?",
//         choices: [
//           "Sales Lead",
//           "Salesperson",
//           "Lead Engineer",
//           "Software Engineer",
//           "Account Manager",
//           "Accountant",
//           "Legal Team Lead",
//           "Lawyer"
//         ]
//       }

//     ]);
// };


// //Add Employee Role
// function addRole() {
//   inquirer
//     .prompt([
//       {
//         name: "role",
//         type: "input",
//         message: "What is the employee Role?"
//       },
//       {
//         name: "salary",
//         type: "input",
//         message: "What is the salary?"
//       }
//     ])
//     .then(function (answer) {
//       if (answer.role === "Lead Engineer" || "Software Engineer" || "Account Manager" || "Accountant" || "Legal Team Lead" || "Lawyer") {
//         connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;", [answer.role], function (err, result) {
//           if (err) throw err;
//         }

//         );
//       };

//     }
//     )
// };



// // Displays all employees by department: improve by making a loop that picks up department names
// function viewDepartment() {
//   inquirer
//     .prompt({
//       name: "department",
//       type: "list",
//       message: "What department's employees would you like to see?",
//       choices: ["Sales", "Engineering", "Finance", "Legal"],
//     })
//     .then(function (answer) {
//       const query =
//         `SELECT employee.first_name, employee.last_name " +
//         "FROM employee " +
//         "INNER JOIN role " +
//         "ON employee.role_id=role.id " +
//         "INNER JOIN department " +
//         "ON role.department_id=department.id " +
//         "WHERE department.name='" +
//         answer.department`;
//       connection.query(query, function (err, res) {
//         if (err);
//         console.table(res);

//       });

//     });
// }

