const inquirer = require('inquirer');
const db = require('./db/connection');

function firstPrompt(){
inquirer
  .prompt({
      name: "todo",
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments', 
        'View all roles', 
        'View all employees', 
        'Add a department', 
        'Add a role', 
        'Add an employee', 
        'Update an employee role', 
        'Quit'
        ]
  })
  .then(answers => {
    switch (answers.todo){
        case 'View all departments':
          viewDepartment()
            break;
        case 'View all roles':
          viewRole()  
            break;
        case 'View all employees':
          viewEmployee()  
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
            break;
        case 'Quit':
            console.log("All Done!")
            break;
    }
  });
};

function viewDepartment(){
  db.query("SELECT * FROM department",(err,data)=>
  {
    if(err){
      throw(err)
    }
    console.table(data)
    firstPrompt()
  })
}
function viewRole(){
  db.query("SELECT * FROM role",(err,data)=>
  {
    if(err){
      throw(err)
    }
    console.table(data)
    firstPrompt()
  })
}
function viewEmployee(){
  db.query("SELECT * FROM employee",(err,data)=>
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
  ]).then((answers) => {

    db.query(`INSERT INTO department (name) VALUES ("${answers.deptname}")`,(err,data)=>
  {
    if(err){
      throw(err)
    }
    console.log(`New department "${answers.deptname}" added.`)

    firstPrompt()
    })
  })
}
function addRole(){

  inquirer.prompt([
    {
      name: 'rolename',
      type: 'input',
      message: 'What is the name of the new role?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary of the new role?',
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'What is the department_id of the new role?',
    },
  ]).then((answers) => {

    db.query(`INSERT INTO role (title,salary,department_id) VALUES ("${answers.rolename}",${answers.salary},${answers.department_id})`,(err,data)=>
  {
    if(err){
      throw(err)
    }
    console.log(`New role "${answers.rolename}" added.`)

    firstPrompt()
    })
  })
}



function addEmployee(){

  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'What is the first name of the new employee?',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the last name of the new employee?',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'What is the role_id of the new employee?',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'What is the manager_id of the new employee?',
    },
  ]).then((answers) => {

    db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${answers.first_name}","${answers.last_name}",${answers.role_id},${answers.manager_id})`,(err,data)=>
  {
    if(err){
      throw(err)
    }
    console.log(`New employee ${answers.first_name} ${answers.last_name} added.`)

    firstPrompt()
    })
  })
}


firstPrompt();