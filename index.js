// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        default: 'Professional README Generator',
        validate: (input) => validateData(input, "You need to enter a title to continue")
    },
    {
        type: 'input',
        name: 'description',
        message: 'Write a brief description of your project:',
        default: 'Generate a professional README.md file for your project',
        validate: (input) => validateData(input, "You need to enter a brief description to continue")
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter the require pre-requisites for this project:',
        default: 'nodeJS & npm install inquirer',
        validate: (input) => validateData(input, "You need to enter installation/pre-requisites to continue")
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Explain how to use the application:',
        default: 'Download repository, open PowerShell/Bash, navigate in PowerShell/Bash into the downloaded repository folder, run "node index.js"',
        validate: (input) => validateData(input, "You need to enter how to use steps to continue")
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please enter contribution guidelines:',
        default: 'This is open source project. Feel free to contribute😊.',
        validate: (input) => validateData(input, "You need to enter contribution guidelines to continue")
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter tests instructions:',
        default: 'Run node index.js in the terminal. Answer questions to select required sections for your README.',
        validate: (input) => validateData(input, "You need to enter tests instructions to continue")
    },
    {
        type: 'input',
        name: 'username',
        message: 'Enter your Github username:',
        default: 'Github',
        validate: (input) => validateData(input, "You need to enter your Github username to continue")
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email:',
        default: 'github@github.com',
        validate: (input) => validateData(input, "You need to enter your email contact information to continue")
    },
    {
        type: 'list',
        name: 'licensing',
        message: 'Choose a license for your project:',
        choices: ['Apache', 'General Public v3', 'MIT'],
        default: 'General Public v3',
        validate: (input) => validateData(input, "You need to choose a license to continue")
    }
];

function validateData(input, msg) {
    
    if (input)
        return true;
    else {
        console.log(`\n${msg}`);
        return false;
    }
}

// TODO: Create a function to write README file
async function writeToFile(fileName, data) {

    const newFile = fs.promises.writeFile;
    const appendFile = fs.promises.appendFile;
    let licenseType;

    await newFile(fileName, `# ${data.title}\n\n`, (error) => {
        if (error)
            console.log(error);
        else 
            console.log("Creating README.md");
    });

    if (data.licensing == "Apache")
        licenseType = "Apache%202.0";
    else if (data.licensing == "General Public v3")
        licenseType = "GPLv3";
    else if (data.licensing == "MIT")
        licenseType = "MIT";
    
    await appendFile(fileName, "## Licensing:\n");
    await appendFile(fileName, `[![license](https://img.shields.io/badge/license-${licenseType}-blue.svg)](https://shields.io)\n`);
    
    await appendFile(fileName, "#### Table of Contents\n");
    await appendFile(fileName, "1. [Description](#description)\n");
    await appendFile(fileName, "2. [Installation](#installation)\n");
    await appendFile(fileName, "3. [Usage](#usage)\n");
    await appendFile(fileName, "4. [Contributing](#contributing)\n");
    await appendFile(fileName, "5. [Tests](#tests)\n");
    await appendFile(fileName, "6. [Questions](#questions)\n\n");

    await appendFile(fileName, "## Description\n");
    await appendFile(fileName, `${data.description}\n\n`);

    await appendFile(fileName, "## Installation\n");
    await appendFile(fileName, `${data.installation}\n\n`);

    await appendFile(fileName, "## Usage\n");
    await appendFile(fileName, `${data.usage}\n\n`);

    await appendFile(fileName, "## Contributing\n");
    await appendFile(fileName, `${data.contributing}\n\n`);

    await appendFile(fileName, "## Tests\n");
    await appendFile(fileName, `${data.tests}\n\n`);

    await appendFile(fileName, "## Questions\n");
    await appendFile(fileName, "For any questions, you can contact:  \n");
    await appendFile(fileName, `Github = https://github.com/${data.username}  \n`);
    await appendFile(fileName, `Email  = ${data.email}\n`);
}

// TODO: Create a function to initialize app
function init() {
    
    inquirer
    .prompt(questions)
    .then((response) => {
        writeToFile("README.md", response);
    });
}

// Function call to initialize app
init();