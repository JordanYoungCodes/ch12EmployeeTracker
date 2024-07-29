SELECT * 
FROM employee
JOIN role ON employee.role_id = role.id
WHERE  role.id = 01;

INSERT INTO role(id, title, salary, department_id)
VALUES (01, Manager, 80,000, 01);