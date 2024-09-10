INSERT INTO department (id, name)
VALUES (03, 'management');



INSERT INTO role (id, title, salary, department_id)
VALUES ( 01, 'Manager', 80000.00, 03);


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (01, 'jordan', 'young', 01, 01);


SELECT * 
FROM employee;

