const { log } = require('console');
const inquirer = require('inquirer');
const dbEmployeeTrack = require('./db')

function employeePrompt() {

    inquirer.prompt([
        {
            type: 'list',
            message: 'what would you like to do?',
            name: 'employeeStart',
            choices: ["add employee name", "add a department", "add an employee role"],
        }
    ])
        .then((response) => {
            console.log(response.employeeStart);
            if (response.employeeStart === "add employee name") {
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
                            choices: [`${this.role}`],  //needs to match the code for role inquirer
                        },
                        {
                            type: 'list',
                            message: 'what is the role of the employee?',
                            name: 'eManager',
                            choices: [`${this.eFirstName} ${this.eLastName}`]
                        }
                    ])
                    .then(response => {
                        // dbEmployeeTrack.
                        console.log('getting roles', response)
                    }) 
            } else if (response.employeeStart === "add a department") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'what is the name of the department?',
                            name: 'dName',
                        },
                    ])
            } else if (response.employeeStart === "add an employee role") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the name of the new role?',
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
                            choices: [],
                        },
                    ])
            }
        })
}


function main() {
    console.log('starting app...');
    employeePrompt();
}

main()