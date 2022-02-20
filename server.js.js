const inquirer = require('inquirer');
const db = require('./db/connection');

function firstPrompt(){
inquirer
  .prompt({
      name: 'todo',
      type: 'list',
      message: 'Hello! What would you like to do?',
      choices: [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        // 'Update an employee role', 
        'Quit'
        ]
  })
  .then(answer => {
    switch (answer.todo){
        case 'View All Departments':
          viewDepartments()
            break;
        case 'View All Roles':
          viewRoles()  
            break;
        case 'View All Employees':
          viewEmployees()  
            break;
        case 'Add a Department':
          addDepartment();  
            break;
        case 'Add a Role':
          addRole();
            break;
        case 'Add an Employee':
          addEmployee();
            break;
        // case 'Update an employee role':
        //   updateEmployee();
        //     break;
        case 'Quit':
            console.log("Goodbye!")
            break;
    }
  });
};

function viewDepartments(){
  db.query('SELECT * FROM department', (err,data)=>
  {
    if(err){
      throw(err)
    }
    console.table(data)
    firstPrompt()
  })
}
function viewRoles(){
  db.query('SELECT * FROM role', (err,data)=>
  {
    if(err){
      throw(err)
    }
    console.table(data)
    firstPrompt()
  })
}
function viewEmployees(){
  db.query('SELECT * FROM employee', (err,data)=>
  {
    if(err){
      throw(err)
    }
    console.table(data)
    firstPrompt()
  })
}
function addDepartment(){
  inquirer
    .prompt([
    {
      name: 'deptname',
      type: 'input',
      message: 'What is the new department name?',
      
    },
  ]).then((answer) => {

    db.query(`INSERT INTO department (name) VALUES ('${answer.deptname}')`,( err,data)=>
  {
    if(err){
      throw(err)
    }
    console.log(`New department '${answer.deptname}' added.`)

    firstPrompt()
    })
  })
}
function addRole(){

  inquirer
    .prompt([
    {
      name: 'rolename',
      type: 'input',
      message: 'What is the name of the new role?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary for the new role?',
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'What is the department_id for the new role?',
    },
  ]).then((answer) => {

    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.rolename}', ${answer.salary}, ${answer.department_id})`, (err,data)=>
  {
    if(err){
      throw(err)
    }
    console.log(`'${answer.rolename}' has been added as a new role.`)

    firstPrompt()
    })
  })
}

function addEmployee(){

  inquirer
    .prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the new employees first name?',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the new employees last name?',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'What is the new employees role_id?',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the new employees manager_id?',
    },
  ]).then((answer) => {

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', ${answer.role_id}, ${answer.manager_id})`, (err,data)=>
  {
    if(err){
      throw(err)
    }
    console.log(`${answer.first_name} ${answer.last_name} has been added.`)

    firstPrompt()
    })
  })
}

// function updateEmployee(){
 
//      inquirer
//     .prompt([
//     {
//       name: 'employee',
//       type: 'input',
//       message: 'Which employee would you like to update?'
//     },
//     {
//       name: 'role',
//       type: 'input',
//       message: 'What is the updated role_id?'
//     },
//   ]).then((answer) => {

//     db.query(`UPDATE employee SET role_id = '${answer.role}' WHERE employee(id) = '${answer.employee}'`), (err,data)=>
//   {
//     if(err){
//       throw(err)
//     }
    
//     console.log(`Employee ${answer.update} has their role updated to ${answer.updateRole}.`)

//     firstPrompt()
//     }
//   })
// }

firstPrompt();