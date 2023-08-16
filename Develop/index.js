// Required packages
const generateMarkdown = require('./utils/generateMarkdown.js');

const inquirer = require('inquirer');
const fs = require('fs');


let projectQuestion = {
    question: '',
    varName: '',
    type: '',
    choices: []
};

let projectQuestions = [];


let prompt = {
    type: '',
    message: '',
    name: '',
    choices: []
}

let prompts = [];


const licenseOptions = [`MIT`, `Apache`, `GPL`, `BSD`, `None`];

let license = {
    licenseName: '',
    licenseBadge: '',
    licenseLink: ''
}

let licenses = [];



const xlicenseBadges = [`[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
                       `[![License: Apache](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,   
                       `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
                       `[![License: BSD](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`,
                       ``];
                        
function loadLicenseInfo() {
    // Dev Note: This table must be in the same order as the licenseOptions array and 
    //             contain the same licenses
    
    license.licenseName = 'MIT';
    license.licenseBadge = 'https://img.shields.io/badge/License-MIT-yellow.svg';
    license.licenseLink = 'https://opensource.org/licenses/MIT';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName = 'Apache';
    license.licenseBadge = 'https://img.shields.io/badge/License-Apache%202.0-blue.svg';
    license.licenseLink = 'https://opensource.org/licenses/Apache-2.0';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName = 'GPL';
    license.licenseBadge = 'https://img.shields.io/badge/License-GPLv3-blue.svg';
    license.licenseLink = 'https://www.gnu.org/licenses/gpl-3.0';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName = 'BSD';
    license.licenseBadge = 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg';
    license.licenseLink = 'https://opensource.org/licenses/BSD-3-Clause';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName = 'None';
    license.licenseBadge = '';
    license.licenseLink = '';
    licenses.push(JSON.parse(JSON.stringify(license)));

    console.log(licenses);
}

function loadQuestions() {
    let question = projectQuestion;
    // Initialize projectQuestions array
    projectQuestions = [];

    
    question.question = 'What is the title of your project?';
    question.varName = `projectTitle`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));


    question.question = 'What is the description of your project?';
    question.varName = `projectDescription`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    question.question = 'What are the installation instructions for your project?';
    question.varName = `projectInstallation`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    question.question = 'What is the usage information for your project?';
    question.varName = `projectUsage`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    question.question = 'What are the contribution guidelines for your project?';
    question.varName = `projectContribution`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    question.question = 'What are the test instructions for your project?';
    question.varName = `projectTest`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    question.question = 'What is your GitHub username?';
    question.varName = `projectGithub`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    question.question = 'What is your email address?';
    question.varName = `projectEmail`;
    question.type = 'input';
    question.choices = [];
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    question.question = 'What license would you like to use?';
    question.varName = `projectLicense`;
    question.type = 'list';
    question.choices = licenseOptions;
    projectQuestions.push(JSON.parse(JSON.stringify(question)));

    console.log(projectQuestions);

    buildPrompts();
}

function buildPrompts() {    
    // Initialize prompts array
    prompts = [];
    
    // Looping through questions and building prompt array for inquirer
    for(let i = 0; i < projectQuestions.length; i++) {
        projectQuestion = projectQuestions[i];

        prompt.type = projectQuestion.type;
        prompt.message = projectQuestion.question;
        prompt.name = projectQuestion.varName;
        prompt.choices = projectQuestion.choices;
 
        prompts.push(JSON.parse(JSON.stringify(prompt))); 
    }        
    
    console.log(prompts);

}

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {console.log(err)});
}

// Initialize Routine will call the functions to load the questions, ask the questions, paginate the results, and write the file
const init = async () => {
    // Populate Questions
    loadQuestions();
    
    // Populate License Info
    loadLicenseInfo();

    // Ask Questions
    const response = await inquirer.prompt(prompts);

    // Generate Markdown
    const data = generateMarkdown(response);


    // write markdown to file
    writeToFile('README_test.md', data);

}

// Function call to initialize app
init();
