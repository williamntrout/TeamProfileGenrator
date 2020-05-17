const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// let hasManager = false;
let employees = [];

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
        when: (answers) => {
            return answers.role === "Manager";
        },
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's github user name?",
        when: (answers) => {
            return answers.role === "Engineer";
        },
    },
    {
        type: "input",
        name: "school",
        message: "What school does the Intern attend?",
        when: (answers) => {
            return answers.role === "Intern";
        },
    },
];

const init = async () => {
    const answer = await inquirer.prompt(questions);
    // Figure out what R is
    switch (answer.role) {
        case "Manager":
            employees.push(
                new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
            );
            // init();
            break;
        case "Intern":
            employees.push(
                new Intern(answer.name, answer.id, answer.email, answer.school)
            );
            // init();
            break;
        case "Engineer":
            employees.push(
                new Engineer(answer.name, answer.id, answer.email, answer.github)
            );
            // init();
            // hasManager = true;
            // condition check 
            //   ask questions to add first employee
            break;
        default:
            // ask if you want to do it again. here
            console.log("Not set up yet");
            break;
    }
    // Push he new object to emloyees
    // Figure ou if the user would like to coninue
    // Render or continue
    fs.writeFile("team.html", render(employees), () => {
        // console.log("teamMemberAdded");
    });
};
// .then((inquirerResponse) => {
//     const markdown = generateMarkdown(inquirerResponse)

//     writeToFile(
//         "README.md",
//         markdown
//     );
// });

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```