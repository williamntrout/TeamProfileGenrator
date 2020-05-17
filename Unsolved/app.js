const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const employees = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer").render;

const questions = [{
        type: "input",
        name: "name",
        message: "What is the employee's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID number?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"],
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the Managers office number?",
        when: (answer) => {
            return answer.role === "Manager";
        },
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's github user name?",
        when: (answer) => {
            return answer.role === "Engineer";
        },
    },
    {
        type: "input",
        name: "school",
        message: "What school does the Intern attend?",
        when: (answer) => {
            return answer.role === "Intern";
        },
    },
];

const addNext = () => {
    inquirer
        .prompt([{
            type: "list",
            name: "add",
            message: "Would You Like To Add Another Employee?",
            choices: ["Yes", "No"]
        }])
        .then(function (res) {
            if (res.add === "Yes") {
                init();
            } else {
                console.log("Done");
            }
        });
};

const init = async () => {
    const answer = await inquirer.prompt(questions);
    // Figure out what R is
    switch (answer.role) {
        case "Manager":
            employees.push(
                new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
            );
            addNext();
            break;
        case "Intern":
            employees.push(
                new Intern(answer.name, answer.id, answer.email, answer.school)
            );
            addNext();
            break;
        case "Engineer":
            employees.push(
                new Engineer(answer.name, answer.id, answer.email, answer.github)
            );
            addNext();
            break;
        default:
            break;
    };
    fs.writeFile("team.html", render(employees), () => {});
};

init();