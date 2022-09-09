const mysql = require('mysql2');
require('console.table');
require('dotenv').config();

const connection = require('./dbConnection.js');
const app = require('./index.js');


const db = mysql.createConnection(
    {
        host: connection.db_host,
        port: connection.db_port,
        user: connection.db_user,
        password: connection.db_pass,
        database: 'company_db'
    },    
    console.log(`Connected to the database.`)
);

db.connect(err => {    
    if (err) throw err;
});

//gets info from the DB for the VIEW option on the ppal menu
const view = (option) => {
    let queryReq = '';
    switch (option) {
        case 'department':
            queryReq = `SELECT id as Id, name as Department FROM ${option};`;
            break;
        case 'role':
            queryReq = `SELECT role.id AS Id, role.title AS Role, role.salary AS Salary, department.name AS \'Belongs to:\' FROM ${option} JOIN department ON role.department_id = department.id;`;
            break;
        case 'employee':
            queryReq = `SELECT emp.id AS Id, CONCAT(emp.first_name, ' ', emp.last_name)AS Name, role.title AS Role, dep.name AS Department, role.salary AS Salary, IF(emp.manager_id IS NULL, 'Manager', CONCAT(emp2.first_name,' ', emp2.last_name)) AS Manager 
            FROM employee emp 
            JOIN role ON emp.role_id = role.id 
            JOIN department dep ON role.department_id = dep.id 
            LEFT JOIN employee emp2 ON emp.manager_id = emp2.id;`;
            break;
        case 'empDep':
            queryReq = 'SELECT employee.id AS Id, CONCAT(employee.first_name,\' \', employee.last_name) AS \'Employee Name\', department.name AS Department FROM employee JOIN role JOIN department ON employee.role_id = role.id AND role.department_id = department.id ORDER BY department.id;';
            break;
        case 'empMan':
            queryReq = `SELECT emp1.id AS Id, CONCAT(emp1.first_name, \' \', emp1.last_name) AS \'Employee Name\', IF(emp1.manager_id IS NULL, 'Manager', CONCAT(emp2.first_name, ' ', emp2.last_name)) AS Manager FROM employee emp1 LEFT JOIN employee emp2 ON emp1.manager_id = emp2.id ORDER BY emp2.id;`;
            break;
        case 'budget':
            queryReq = `SELECT department.id AS Id, department.name AS Department, SUM(role.salary) AS Budget FROM employee JOIN role JOIN department ON employee.role_id = role.id AND role.department_id = department.id GROUP BY department.id;`;
            break;
    }

    db.query(queryReq, (err, res) => {
        if (err) {console.log('\nRequest can not be processed\n'); return app.showMenu();}
        console.table(res);
        app.showMenu();
    });
};
//gets info from the database based on the parameters it receives
const getData = (columns, table, condition) => {
    let queryReq = '';
    condition ? queryReq = `SELECT ${columns} FROM ${table} WHERE ${condition};` : queryReq = `SELECT ${columns} FROM ${table};`;
    return db.promise().query(queryReq)
        .then(([data]) => {
            return data;
        });
};
//adds to the database the information received in the parameters
const add = (table, columns, data) => {
    let queryReq = `INSERT INTO ${table} (${columns}) VALUES (${data});`;
    db.query(queryReq, (err, res) => {
        if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
        console.log(`\nNew ${table} was successfully created\n`);
        app.showMenu();
    });
};
//updates the database with the information received in the parameters
const update = (table, setChanges, condition, msg) => {
    let queryReq = `UPDATE ${table} SET ${setChanges} WHERE ${condition}`;
    db.query(queryReq, (err, res) => {
        if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
        console.log(`\n${msg} was successfully updated\n`);
        app.showMenu();
    });
};
//deletes from the DB a department or role or employee
const toDelete = (table, value, msg) => {
    let queryReq = '';

    if (table === 'department') {
        queryReq = `DELETE FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ${value}) AND manager_id IS NOT NULL;`;
        db.query(queryReq, (err, res) => {
            if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
            queryReq = `DELETE FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ${value});`;
            db.query(queryReq, (err, res) => {
                if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
                queryReq = `DELETE FROM role WHERE department_id = ${value};`;
                db.query(queryReq, (err, res) => {
                    if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
                    queryReq = `DELETE FROM ${table} WHERE id = ${value};`;
                    db.query(queryReq, (err, res) => {
                        if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
                        console.log('\n' + msg + '\n');
                        return app.showMenu();
                    });
                });
            });    
        })
    } else if (table === 'role') {
        queryReq = `DELETE FROM employee WHERE manager_id IN (SELECT id FROM (SELECT employee.id FROM employee WHERE employee.role_id = ${value} AND employee.manager_id IS NULL) AS ans);`;
        db.query(queryReq, (err, res) => {
            if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
            queryReq = `DELETE FROM employee WHERE role_id = ${value};`;
            db.query(queryReq, (err, res) => {
                if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
                queryReq = `DELETE FROM role WHERE id = ${value};`;
                db.query(queryReq, (err, res) => {
                    if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
                    console.log('\n' + msg + '\n');
                    return app.showMenu();
                });
            });    
        })
    } else if (table === 'employee') {
        queryReq = `DELETE FROM ${table} WHERE id = ${value};`;
        db.query(queryReq, (err, res) => {
            if (err) {console.log('\n Request can not be processed \n'); return app.showMenu();}
            console.log('\n' + msg + '\n');
            app.showMenu();
        });
    }

};

module.exports = {
    view: view,
    add: add,
    getData: getData,
    update: update,
    toDelete: toDelete
}

