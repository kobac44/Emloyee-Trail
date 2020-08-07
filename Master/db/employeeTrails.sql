DROP DATABASE IF EXISTS employeeTrails_db;
CREATE DATABASE employeeTrails__db;

USE employeeTrails__db;

CREATE TABLE department
(
    department_id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR
    (30) NOT NULL
  );

    CREATE TABLE role
    (
        role_id INT NOT NULL
        AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR
        (30),
  salary DECIMAL
        (10,2),
  department_id INT NOT NULL
  );

        CREATE TABLE employee
        (
            emplyee_id INT NOT NULL
            AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR
            (30) NOT NULL,
last_name VARCHAR
            (30) NOT NULL,
role_id INT NOT NULL,
manager INT NOT NULL
);
