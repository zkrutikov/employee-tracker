const inquirer = require('inquirer');
const connection = require("./db/connection");
const consoleTable = require('console.table');

// General questions
const mainMenu = [
    {type: 'list',
    name: 'mainMenu',
    choices: [
        'Veiw all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
    ]}
];

const viewDepartments = () => {
    query = `SELECT department_name FROM department`;
    connection.query(query, (err, results) => {
        if (err) throw err;
        console.table(('All Departments'), results)
        init();
    })
}

const viewRoles = () => {
    query = `SELECT title, salary FROM role`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(('All Employees'), res)
        init();
    })
}

const viewEmployees = () => {
    query = 'SELECT first_name, last_name FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(('All Employees'), res)
        init();
    })
}

const addDepartment = () => {
    query = `SELECT department_name AS "Department" FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;

        console.log('');
        console.table('List of current Departments'), res;

        inquirer.prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'Enter the name of the Department to add:'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO department(department_name) VALUES( ? )`, answer.newDept)
            init();
        })
    })
}

const addRole = () => {
    const addRoleQuery = `SELECT * FROM role; SELECT * FROM department`
    connection.query(addRoleQuery, (err, res) => {
        if (err) throw err;

        console.log('');
        console.table('List of current Roles:'), res[0];

        inquirer.prompt([
            {
                name: 'newTitle',
                type: 'input',
                message: 'Enter the new Title:'
            },
            {
                name: 'newSalary',
                type: 'input',
                message: 'Enter the salary for the new Title:'
            },
            {
                name: 'dept',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.department_name);
                    return choiceArray;
                },
                message: 'Select the Department for this new Title:'
            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO roles(title, salary, department_id) 
                VALUES
                ("${answer.newTitle}", "${answer.newSalary}", 
                (SELECT id FROM departments WHERE department_name = "${answer.dept}"));`
            )
            init();
        })
    })
}

const addEmployee = () => {
    const roleQuery = 'SELECT * from role; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employee e'
    const addEmployeeQuestions = ['What is the first name?', 'What is the last name?', 'What is their role?', 'Who is their manager?']

    connection.query(roleQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'fName',
                type: 'input',
                message: addEmployeeQuestions[0]

            },
            {
                name: 'lName',
                type: 'input',
                message: addEmployeeQuestions[1]
            },
            {
                name: 'role',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.title);
                    return choiceArray;
                },
                message: addEmployeeQuestions[2]

            },
            {
                name: 'manager',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: addEmployeeQuestions[3]

            }
        ]).then((answer) => {
            connection.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, 
                (SELECT id FROM role WHERE title = ? ), 
                (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ? ) AS tmptable))`, [answer.fName, answer.lName, answer.role, answer.manager]
            )
            init();
        })
    })
}

const exit = () => {
    process.exit();
};

const updateRole = () => {
    const query = `SELECT CONCAT (first_name," ",last_name) AS full_name FROM employee; SELECT title FROM role`
    connection.query(query, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'empl',
                type: 'list',
                choices: function () {
                    let choiceArray = results[0].map(choice => choice.full_name);
                    return choiceArray;
                },
                message: 'Select an employee to update their role:'
            },
            {
                name: 'newRole',
                type: 'list',
                choices: function () {
                    let choiceArray = results[1].map(choice => choice.title);
                    return choiceArray;
                }
            }
        ]).then((answer) => {
            connection.query(`UPDATE employee 
            SET role_id = (SELECT id FROM role WHERE title = ? ) 
            WHERE id = (SELECT id FROM(SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?) AS tmptable)`, [answer.newRole, answer.empl], (err, results) => {
                    if (err) throw err;
                    init();
                })
        })


    })

}
// Starter function 
const init = () => {
    inquirer.prompt(mainMenu)
    .then((answer) => {

        switch (answer.mainMenu) {
            case 'Veiw all departments':
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
                updateRole();
                break;
            case 'Exit':
                exit();
                break; 
        }
    })
}; 

init();