const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: 'root',
  password: '12345',
  database: 'employeeTrails'
});


function start() {
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add Employee',
        'Remove Employee',
        'View All Employees',
        'Add Employee Role',
        'Delete Employee Role',
        'View Employee Role',
        'Add Employee By Department',
        'View Employee By Department',
        'Delete Employee by Department',
        'Update Employee Roles',
      ]
    }

  ]).then(function (answer) {
    switch (answer.action) {
      case 'Add Employee':
        addEmployee();
        break;

      case 'Remove Employee':
        removeEmployee();
        break;



    }
  }
  )
};
start();



