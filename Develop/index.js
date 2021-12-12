const inquirer = require('inquirer');

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

function init() {
    inquirer.prompt(mainMenu)
    .then((answer) => {
        console.log(answer);
        switch (answer.action) {
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
                updateEmployeeRole();
                break;
            case 'Exit':
                exit();
                break; 
        }
    })
}; 


init();