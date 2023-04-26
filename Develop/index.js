const fs = require('fs');
var inquirer = require('inquirer');
const generateHtml = require('./util/generateHtml');
const Engineer = require('./lib/Engineer');
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");



function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {})
}


async function mainLoop() {
    var team = [];
    managerInfo = await inquirer.prompt ([
        {name:"Name", message:'Manager Name'}, 
        {name:"eId", message:'Manager Id'},
        {name:"Email", message:'Manager Email'},
        {name:"Number", message:'Office Number'},
        ])
        const manager = new Manager(managerInfo.Name, managerInfo.eId, managerInfo.Email, managerInfo.Number)
        team.push(manager)

    while(true) {
        addNewEmployee = await inquirer.prompt ([
            {type:"list", name:"Continue", message:'Add Another Employee?', choices:['Yes', 'No']}
        ])
        
        console.log(addNewEmployee)
        if(addNewEmployee.Continue !== "Yes") {
       
            html = generateHtml(team)
        
            writeToFile("index.html", html)
            return
        }

        role = await inquirer.prompt ([
            {type:"list", name:"Role", message:'Employee Role', choices:['Engineer', 'Intern',]}
        ])
        basicInfo = await inquirer.prompt ([
            {name:"Name", message:'Employee Name'}, 
            {name:"eId", message:'Employee Id'},
            {name:"Email", message:'Employee Email'},
            ])
            
    
        
        if(role.Role == "Engineer") {
            
            github = await inquirer.prompt ([
                {name:"Github", message:'Github Username'}
            ])
            
            const engineer = new Engineer(basicInfo.Name, basicInfo.eId, basicInfo.Email, github.Github)
            team.push(engineer)

        } else if(role.Role == "Intern") {
            
            school = await inquirer.prompt ([
                {name:"School", message:'School'}
            ])
            
            const intern = new Intern(basicInfo.Name, basicInfo.eId, basicInfo.Email, school.School)
            team.push(intern)

        } else {
            console.log("Error")
        }

    }
}
// TODO: Create a function to initialize app
function init() {
    mainLoop()
}

// Function call to initialize app
init();



function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {})}