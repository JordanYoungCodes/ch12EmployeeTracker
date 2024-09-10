const { log } = require('console');
const inquirer = require('inquirer');
const db = require('./db');
// console.log(db);

function employeePrompt() {

    inquirer.prompt(
        {
            type: 'list',
            message: 'what would you like to do?',
            name: 'employeeStart',
            choices: [
                "add employee",
                "add a department",
                "add an employee role",
                "view all departments",
                "view all roles",
                "view all employees",
                "update an employee role"
            ],
        }
    )
        .then((response) => {

            if (response.employeeStart === "add employee") {
                db.query(`SELECT title, id FROM role;`, (error, { rows }) => {
                    const roles = rows.map(role => ({ name: role.title, value: role.id }))


                    db.query(`SELECT first_name, last_name, id FROM employee WHERE role_id = $1;`, [1], (error, { rows }) => {
                        const managers = rows.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    message: 'what is the first name of the employee?',
                                    name: 'eFirstName',
                                },
                                {
                                    type: 'input',
                                    message: 'what is the last name of the employee?',
                                    name: 'eLastName',
                                },
                                {
                                    type: 'list',
                                    message: 'what is the employees role?',
                                    name: 'eRole',
                                    choices: roles,
                                },
                                {
                                    type: 'list',
                                    message: 'who is the manager for the employee?',
                                    name: 'eManager',
                                    choices: managers,
                                }
                            ])
                            .then(response => {
                                console.log(response)
                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [response.eFirstName, response.eLastName, response.eRole, response.eManager], (error, results) => {
                                    if (error) {
                                        console.error('error executing querry', error);
                                        employeePrompt()

                                    } else {
                                        console.log('succesful employee creation')
                                        employeePrompt()
                                    }

                                })
                            })
                    })
                })
            } else if (response.employeeStart === "add a department") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'what is the name of the department?',
                            name: 'dName',
                        },
                    ]).then(response => {
                        db.query(`INSERT INTO department (name) VALUES ($1)`, [response.dName], (error, results) => {
                            if (error) {
                                console.error('error executing querry', error);
                                employeePrompt()
                            } else {
                                console.log('succesful department creation');
                                employeePrompt();
                            }
                        })
                    })
            } else if (response.employeeStart === "add an employee role") {
                db.query(`SELECT id, name FROM department`, (error, { rows }) => {
                    const department = rows.map(department => ({ name: department.name, value: department.id }))
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: 'What is the title of the new role?',
                                name: 'rName',
                            },
                            {
                                type: 'input',
                                message: 'What is the salary of the new role?',
                                name: 'rSalary',
                            },
                            {
                                type: 'list',
                                message: 'What department does the new role belong to?',
                                name: 'rDepartment',
                                choices: department,
                            },
                        ]).then(response => {
                            db.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [response.rName, response.rSalary, response.rDepartment], (error, results) => {
                                if (error) {
                                    console.error('error executing querry', error);
                                    employeePrompt()

                                } else {
                                    console.log('succesful role creation')
                                    employeePrompt()
                                }

                            })
                        })
                })
            } else if (response.employeeStart === "view all departments") {
                console.log("viewing all departments");
                // we need to QUERY our DAtabase for this info
                db.query(`SELECT name FROM department`, function (error, { rows }) {
                    if (error) {
                        console.log("Err: ", error);
                        employeePrompt()
                    } else {
                        console.table(rows);
                        employeePrompt()
                    }
                })
            } else if (response.employeeStart === "view all roles") {
                console.log("viewing all roles");
                // we need to QUERY our DAtabase for this info
                db.query(`SELECT role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id`, function (error, { rows }) {
                    if (error) {
                        console.log("Err: ", error);
                        employeePrompt()
                    } else {
                        console.table(rows);
                        employeePrompt()
                    }
                })
            } else if (response.employeeStart === "view all employees") {
                console.log("viewing all employees");
                // we need to QUERY our DAtabase for this info
                db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT(manager_name.first_name, manager_name.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN employee manager_name ON manager_name.id = employee.manager_id`, function (error, { rows }) {
                    if (error) {
                        console.log("Err: ", error);
                        employeePrompt()
                    } else {

                        console.table(rows)
                        employeePrompt()
                    }
                })

            } if (response.employeeStart === "update an employee role") {
                db.query(`SELECT title, id FROM role`, (error, { rows }) => {
                    const roles = rows.map(role => ({ name: role.title, value: role.id }));

                    db.query(`SELECT first_name, last_name, id FROM employee;`, (error, { rows }) => {
                        const employees = rows.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));

                        inquirer
                            .prompt([


                                {
                                    type: 'list',
                                    message: 'what employee do you want to update?',
                                    name: 'employee',
                                    choices: employees,
                                },
                                {
                                    type: 'list',
                                    message: 'what is the employees new role?',
                                    name: 'eRole',
                                    choices: roles,
                                },
                            ])
                            .then(response => {
                                db.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [response.eRole, response.employee], (error, results) => {
                                    if (error) {
                                        console.error('error executing querry', error);
                                        employeePrompt()

                                    } else {
                                        console.log('succesful employee role update')
                                        employeePrompt()
                                    }

                                })
                            })
                    })
                })
            }

        })


}

employeePrompt();