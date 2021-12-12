const connection = require("./connection");

class Db {
    constructor(connection){
        this.connection = connection;
    }
    viewDepartments();
    viewRoles();
    viewEmployees();
    addDepartment();
    addRole();
    addEmployee();
    updateRole();
    // Bonus deleteEmployee();

}