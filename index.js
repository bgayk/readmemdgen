// Required packages and files
const generateMarkdown = require('./utils/generateMarkdown.js');

const inquirer = require('inquirer');
const fs = require('fs');


// Individual projectQuestion object
let projectQuestion = {
    question: '',
    varName: '',
    type: '',
    choices: []
};
// Array of projectQuestion objects
let projectQuestions = [];


// Inquirer prompt object
let prompt = {
    type: '',
    message: '',
    name: '',
    choices: []
}
// Inquire prompt objectS
let prompts = [];


// license Options used in inquirer prompt
// The values in this array must match the values in the licenseInfo array's first item and in the same order
const licenseOptions = [`MIT`, `Apache`, `GPL`, `BSD`, `None`];
let license = {
    licenseName: '',
    licenseBadge: '',
    licenseLink: ''
}

let licenses = [];


function loadLicenseInfo() {
    // Dev Note: This table must be in the same order as the licenseOptions array and 
    //             contain the same licenses
    
    license.licenseName = licenseOptions[0]; // MIT
    license.licenseBadge = 'https://img.shields.io/badge/License-MIT-yellow.svg';
    license.licenseLink = 'https://opensource.org/licenses/MIT';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName =  licenseOptions[1]; // Apache
    license.licenseBadge = 'https://img.shields.io/badge/License-Apache%202.0-blue.svg';
    license.licenseLink = 'https://opensource.org/licenses/Apache-2.0';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName = licenseOptions[2]; // GPL
    license.licenseBadge = 'https://img.shields.io/badge/License-GPLv3-blue.svg';
    license.licenseLink = 'https://www.gnu.org/licenses/gpl-3.0';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName = licenseOptions[3]; // BSD
    license.licenseBadge = 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg';
    license.licenseLink = 'https://opensource.org/licenses/BSD-3-Clause';
    licenses.push(JSON.parse(JSON.stringify(license)));

    license.licenseName = licenseOptions[4]; // None
    license.licenseBadge = '';
    license.licenseLink = '';
    licenses.push(JSON.parse(JSON.stringify(license)));

    // console.log(licenses);
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

    // console.log(projectQuestions);

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
    
    // console.log(prompts);

}

// wrote data to a file 
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => err ? console.error(err) : console.log('Success!'));
}


// Initialize Routine will call the functions to load the questions, ask the questions, paginate the results, and write the file
const init = async () => {
    // Populate Questions
    loadQuestions();
    
    // Populate License Info: Name, Badge, Link
    loadLicenseInfo();

    // Ask Questions
    const response = await inquirer.prompt(prompts);

    // Search for license in licenseOptions array
    license.licenseName = '';
    license.licenseBadge = '';
    license.licenseLink = '';
    for(let i=0; i < licenses.length; i++) {
        if (licenses[i].licenseName === response.projectLicense) {
            license = licenses[i];
            break;
        }
    }
            
    // Generate Markdown from response and license objects
    const data = generateMarkdown(response, license);


    // write README.MD markdown to file to
    // application install directory 
    writeToFile('README.MD', data);

}


// Function call to initialize app
init();
