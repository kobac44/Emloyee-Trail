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
  department_id INT NOT NULL,
  foreign key
        (department_id) references department
        (id) ON
        DELETE CASCADE
)ENGINE =INNODB;

        CREATE TABLE employee
        (
            emplyee_id INT NOT NULL
            AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR
            (30) NOT NULL,
last_name VARCHAR
            (30) NOT NULL,
role_id INT NOT NULL,
foreign key
            (role_id) references role
            (id) ON
            DELETE CASCADE,
manager_id integer(30),
foreign key
            (manager_id) references employee
            (id)ON
            DELETE CASCADE
)ENGINE =INNODB;



            select *
            from role;

            select *
            from employee;

            select *
            from department;

            INSERT into DEPARTMENT
                (name)
            values
                ("Engineering"),
                ("Sales"),
                ("Finance"),
                ("Legal")
            ;

            INSERT into ROLE
                (title, salary, department_id)
            values("Sales Lead" , 15, 1),
                ("Salesperson", 9, 2),
                ("Lead Engineer", 150, 3),
                ("Software Engineer", 16, 4),
                ("Accountant", 7, 1),
                ("Legal", 250000, 2),
                ("Lawyer", 190000, 3);

            INSERT into EMPLOYEE
                (first_name, last_name, role_id, manager_id)
            values
                ('John', 'Doe', 1, NULL),
                ('Mike', 'Chan', 2, 1),
                ('Ashley', 'Rodriguez', 3, NULL),
                ('Kevin', 'Tupik', 4, 3),
                ('Kunal', 'Singh', 5, NULL),
                ('Malia', 'Brown', 6, 5),
                ('Sarah', 'Lourd', 7, NULL),
                ('Tom', 'Allen', 8, 7);
