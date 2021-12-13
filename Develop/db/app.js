// const { init } = require("express/lib/application");
const connection = require("./connection");
const consoleTable = require('console.table');

class Db {
    constructor(connection){
        this.connection = connection;
    }
    viewDepartments(){
        let query = connection.query("SELECT * FROM department", (err, res) => {
            if (err) throw err;
            console.log('Connected');
            console.table(res);
            // init();
        })
    };
        
    
    viewRoles(){

    };
    viewEmployees() {

    };
    addDepartment() {

    };
    addRole() {

    };
    addEmployee() {

    };
    updateRole() {

    };
    exit() {

    };
};
module.exports = new Db();