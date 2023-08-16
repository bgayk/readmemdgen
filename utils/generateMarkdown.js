function renderLicenseBadge(licenseBadge) {
  if(licenseBadge === '' || licenseBadge === null)
  {
    return ``;
  }

  return `![License](${licenseBadge})`;

}

function renderLicenseLink(licenseLink) {
  if (licenseLink === '' || licenseLink === null) 
  {
    return ``;
  } 

  return `(${licenseLink})`;
}

function renderLicenseSection(licenseName) {
  if (licenseName === '' || licenseName === null) 
  {
    return ``;
  }

  return `[${licenseName}]`;
}

function generateMarkdown(data, license) {
  return `# ${data.projectTitle} \n
  ## Description \n
  ${renderLicenseBadge(license.licenseBadge)} \t

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
  ${renderLicenseSection(license.licenseName)}${renderLicenseLink(license.licenseLink)} \n


  ## Contributing \n
  ${data.projectContribution} \n

  ## Tests \n
  ${data.projectTest} \n  

  ## Questions \n
  GitHub Address: https://github.com/${data.projectGithub} \n

           Email: ${data.projectEmail} \n


`
;
}

module.exports = generateMarkdown;
