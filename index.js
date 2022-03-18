const { prompt } = require('inquirer');
const mysql = require('mysql2');
require("console.table");
const logo = require("asciiart-logo");


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
})

init();

function init() {
    connection.connect(err => {
        if(err) {
            console.error('Issue with database connection.');
            return;
        }
        console.log('Database successfully connected');
    });
    
    console.log(logo({
        name: 'Employee Manager UI',
        font: 'Standard',
        borderColor: 'bold-magenta',
        textColor: 'green',
        }).emptyLine().render()
    );

    loadPrompts();
}

function loadPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select command: ",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    .then((answer) => {
        switch(answer.choice){
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            case 'Exit':
                console.log('Thanks for using Employee Tracker!');
                connection.end();
                break;
            default:
                console.log('Please select an option');
                loadPrompts();
        }
    })
}

function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

function updateEmployee() {

}
