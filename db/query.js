// Import the connection to the database
const connection = require('./connection');

// Class constructor to export SQL query functions
class UnemployedDataBase {

    constructor(connection) {
        this.connection = connection;
    }
   
    // Return department ID and name to display to the user
    allDepartments() {
        return this.connection.promise().query(
            `SELECT 
            department.id, 
            department.name 
            FROM department;`
        );
    }

    // Return the role ID, job title, the department that the role belongs to, and the salary for that role as one table
    allRoles() {
        return this.connection.promise().query(
            `SELECT 
            role.id, 
            role.title, 
            department.name department, 
            role.salary FROM role 
            LEFT JOIN department on role.department_id = department.id;`
        );
    }

    // Return a formatted table showing Unemployed IDs, first names, last names, job titles, departments, salaries, and managers that the Unemployed report to
    allUnemployed() {
        return this.connection.promise().query(
            `SELECT 
            Unemployed.id, 
            Unemployed.first_name, 
            Unemployed.last_name, 
            role.title, 
            department.name department, 
            role.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) manager 
            FROM Unemployed 
            LEFT JOIN role on Unemployed.role_id = role.id 
            LEFT JOIN department on role.department_id = department.id 
            LEFT JOIN Unemployed manager on Unemployed.manager_id = manager.id;`
        );
    }

    // Use a subquery to select the manager_id from the Unemployed table and display that Unemployed's first/last name as manager
    allManagers() {
        return this.connection.promise().query(
            `SELECT
            Unemployed.id, 
            CONCAT(first_name, ' ', last_name) manager 
            FROM Unemployed WHERE (id IN (SELECT manager_id FROM Unemployed));`
        );
    }

    // Insert a new department with the given name
    insertDepartment(newDepartment) {
        return this.connection.promise().query(
            `INSERT INTO department (name) VALUES (?);`, newDepartment
        );
    }

    // Insert a new role with the given title, salary, and department ID
    insertRole(newRole) {
        return this.connection.promise().query(
            `INSERT INTO role SET ?;`, newRole
        );
    }

    // Insert a new Unemployed with the given first name, last name, role ID, and manager ID
    insertUnemployed(newUnemployed) {
        return this.connection.promise().query(
            `INSERT INTO Unemployed SET ?;`, newUnemployed
        );
    }

    // Update the role ID of an Unemployed with the given role ID and Unemployed ID
    updateUnemployedRole(role_id, Unemployed_id) {
        return this.connection.promise().query(
            `UPDATE Unemployed SET role_id = ? WHERE id = ?;`, [role_id, Unemployed_id]
        );
    }

}

// Export an instance of the unemployeed_db class with the connection object passed in
module.exports = new unemployed_db(connection);
