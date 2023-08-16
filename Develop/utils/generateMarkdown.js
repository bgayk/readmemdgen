// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.projectTitle} \n
  ## Description \n
  ${data.projectDescription} \n

  ## Table of Contents \n
  * [Installation](#installation) \n
  * [Usage](#usage) \n
  * [License](#license) \n
  * [Contributing](#contributing) \n
  * [Tests](#tests) \n
  * [Questions](#questions) \n

  ## Installation \n
  ${data.projectInstallation} \n

  ## Usage \n
  ${data.projectUsage} \n

  ## License \n
  ${data.projectLicense} \n
  

  ## Contributing \n
  ${data.projectGithub} \n\n

  ${data.projectContribution} \n

  ## Tests \n
  ${data.projectTest} \n  

  ## Questions \n
  ${data.projectEmail} \n
`
;
}

module.exports = generateMarkdown;
