const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/hmtlRenderer");

let employees = []

const managerCreate = (data) => {
  inquirer
    .prompt([
      {
        type: 'number',
        name: 'officeNum',
        message: "What is the manager's office number?"
      }
    ])
    .then(res => {
      let manager = new Manager(data.name, data.id, data.email, res.officeNum)
      employees.push(manager)
      finish()
    })
    .catch(err => { console.log(err) })
}

const engineerCreate = (data) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'gitHub',
        message: "What is the engineers' gitHub username?"
      }
    ])
    .then(res => {
      let engineer = new Engineer(data.name, data.id, data.email, res.gitHub)
      employees.push(engineer)
      finish()
    })
    .catch(err => { console.log(err) })
}

const internCreate = (data) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'school',
        message: "What is the intern's school?"
      }
    ])
    .then(res => {
      let intern = new Intern(data.name, data.id, data.email, res.school)
      employees.push(intern)
      finish()
    })
    .catch(err => { console.log(err) })
}

function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What team member would you like to add?',
        choices: ['Manager', 'Engineer', 'Intern']
      },
      {
        type: 'input',
        name: 'name',
        message: "What is the employee's name?"
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the employee's id?"
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the employee's email?"
      },
    ])
    .then(res => {
      switch (res.choice) {
        case 'Manager':
          managerCreate(res)
          break;

        case 'Engineer':
          engineerCreate(res)
          break;

        case 'Intern':
          internCreate(res)
          break;
      }
    })
    .catch(err => console.log(err))
}

function finish() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'newItem',
        message: 'Would you like to add another member?',
        choices: ['Yes', 'No']
      }
    ])
    .then(res => {
      if (res.newItem === 'Yes') {
        start()
      } else {
        let html = render(employees)
        fs.writeFileSync(path.join(__dirname, 'output', 'team.html'), html)
      }
    })
    .catch(err => console.log(err))
}
start()