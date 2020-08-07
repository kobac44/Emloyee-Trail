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
  inquirer.prompt({

    name: "action",
    type: "list",
    message: "Please Choose.",
    choices: ['Add a Employee', 'View All Employees', 'View All Employees by Departments', 'Add Department', 'View Employees by Department', 'View All Employees by Manager',
      'Update an Employee', 'Update Employee Role',
      "All DONE!"
    ]
    // Switch stament
  }).then(function (answer) {
    switch (answer.action)
  })

}






// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
