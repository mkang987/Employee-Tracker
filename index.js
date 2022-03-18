const { prompt } = require('inquirer');
const mysql = require('mysql2');
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
    const dept = `SELECT department.id AS ID, department.name AS Department FROM department`;

    connection.query(dept, (err,res) => {
        if(err) throw err;
        console.table(res);
        loadPrompts();
    });
}

function viewRoles() {
    const roles = `SELECT role.id AS ID, role.title AS Job_Title, role.salary AS Salary, department.name AS Department FROM role
    INNER JOIN department ON role.department_id = department.id`;

    connection.query(roles, (err,res) => {
        if(err) throw err;
        console.table(res);
        loadPrompts();
    })
}

function viewEmployees() {
    const empQuery = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, employee.manager_id FROM employee JOIN role ON role.id = employee.role_id JOIN department ON role.department_id = department.id ORDER BY employee.id`;
    
    connection.query(empQuery, (err,res) => {
        if(err) throw err;
        console.table(res);
        loadPrompts();
    });
}

function addDepartment() {
    prompt([
        {
            name: "name",
            message: "Which department would you like to add?"
        }
    ])
    .then(res => {
        let newDept = res.name;
        const addQuery =`INSERT INTO department (name) VALUES ("${newDept}")`;
        connection.query(addQuery, newDept, (err) => {
            if(err) throw err;
            console.log("New department added!");
            viewDepartments();
        })
    })
}

function addRole() {
    prompt([
        {
            name: "role",
            message: "What role would you like to add?"
        },
        {
            name: "salary",
            message: "What is the salary?"
        },
        {
            name: "department",
            message: "Which department ID does it belong to?"
        },
    ])
    .then(res => {
        const addQuery =`INSERT INTO role (title, salary, department_id) VALUES ('${res.role}', '${res.salary}', '${res.department}')`;
        connection.query(addQuery, (err) => {
            if(err) throw err;
            console.log("New role added!");
            viewRoles();
        })
    })
}

function addEmployee() {
    prompt([
        {
            name: "first",
            message: "What new employee's first name?"
        },
        {
            name: "last",
            message: "What new employee's last name?"
        },
        {
            name: "role",
            message: "Which role ID do they belong to?"
        },
        {
            name: "manager",
            message: "what is their manager ID#?"
        }
    ])
    .then(res => {
        const addQuery =`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.first}', '${res.last}', '${res.role}', '${res.manager}')`;
        connection.query(addQuery, (err) => {
            if(err) throw err;
            console.log("New employee added!");
            viewEmployees();
        })
    })

}

function updateEmployee() {
    prompt([
        {
            name: 'employee',
            message: 'Which employees role do you want to update?(Input employee ID#)'
        },
        {
            name: 'role',
            message: 'What is the employees new role?(Input role ID#)'
        }
    ])
    .then(res => {
        const updateQuery = `UPDATE employee SET role_id = "${res.employee}" WHERE id = "${res.role}"`;

        connection.query(updateQuery, (err) => {
            if(err) throw err;
            console.log("Employee role updated!");
            viewEmployees();
        })

        }
    )
}
