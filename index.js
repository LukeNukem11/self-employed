// Import required modules
const inquirer = require("inquirer");
require("console.table");

// Import the database query module
const unemployed_db = require("./db/query");

// Define the prompt for the main menu options
const menuPrompt = [
  {
    type: "list",
    name: "menuOpt",
    message: "What would you like to do?",
    choices: [
      {
        name: "View All Departments",
        value: 1,
      },
      {
        name: "View All Roles",
        value: 2,
      },
      {
        name: "View All Unemployed",
        value: 3,
      },
      {
        name: "Add Department",
        value: 4,
      },
      {
        name: "Add Role",
        value: 5,
      },
      {
        name: "Add Unemployed",
        value: 6,
      },
      {
        name: "Update Unemployed Role",
        value: 7,
      },
      {
        name: "Finish",
        value: 8,
      },
    ],
  },
];

// Define the prompt for creating a new department
const createDepartmentPrompt = [
  {
    type: "input",
    name: "newDepartment",
    message: "What is the name of the new department?",
  },
];

// Function to start the main menu
function mainMenu() {
  promptMenu();
}

// Function to prompt the main menu options
function promptMenu() {
  inquirer.prompt(menuPrompt).then((answer) => {
    switch (answer.menuOpt) {
      case 1:
        viewDepartments();
        break;
      case 2:
        viewRoles();
        break;
      case 3:
        viewUnemployed();
        break;
      case 4:
        addDepartment();
        break;
      case 5:
        addRole();
        break;
      case 6:
        updateUnemployedRole();
        break;
      case 7:
        updateUnemployedRole();
        break;
      case 8:
        joblessdb.connection.end();
        console.log("Goodbye!");
        break;
    }
  });
}

// Function to view all departments
function viewDepartments() {
  joblessdb
    .allDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table("Departments", departments);
    })
    .then(() => promptMenu());
}

// Function to view all roles
function viewRoles() {
  joblessdb
    .allRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table("Roles", roles);
    })
    .then(() => promptMenu());
}

// Function to view all Unemployed
function viewUnemployed() {
  joblessdb
    .allUnemployed()
    .then(([rows]) => {
      let Unemployed = rows;
      console.table("Unemployed", Unemployed);
    })
    .then(() => promptMenu());
}

// Function to add a new department
function addDepartment() {
  inquirer
    .prompt(createDepartmentPrompt)
    .then((answer) => {
      let name = answer.newDep;
      joblessdb.insertDepartment(name);
      console.log(`'${name}' added to department database`);
    })
    .then(() => promptMenu());
}

// Function to add a new role
function addRole() {
  joblessdb.allDepartments().then(([rows]) => {
    let departments = rows;
    const listDepartments = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "To which department does this role belong to?",
          choices: listDepartments,
        },
      ])
      .then((answer) => {
        joblessdb.insertRole(answer).then(() =>
          console.log(`${answer.title} added to role database`)
        );
      })
      .then(() => promptMenu());
  });
}

// Function to add a new Unemployed
function addUnemployed() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the Unemployed's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Unemployed's last name?",
      },
    ])
    .then((answer) => {
      let firstName = answer.first_name;
      let lastName = answer.last_name;

      joblessdb.allRoles().then(([rows]) => {
        let roles = rows;
        const listRoles = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role_id",
              message: "What is the Unemployed's role?",
              choices: listRoles,
            },
          ])
          .then((answer) => {
            let roleId = answer.role_id;

            joblessdb.allUnemployed().then(([rows]) => {
              let managers = rows;
              const listManagers = managers.map(
                ({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the Unemployed's manager?",
                    choices: listManagers,
                  },
                ])
                .then((answer) => {
                  let managerId = answer.manager_id;
                  let newUnemployed = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId,
                  };

                  joblessdb.insertUnemployed(newUnemployed);
                  console.log(
                    `${firstName} ${lastName} has been added to the Unemployed database.`
                  );
                })
                .then(() => promptMenu());
            });
          });
      });
    });
}

// Function to update an Unemployed's role
function updateUnemployedRole() {
  joblessdb.allUnemployed().then(([rows]) => {
    let Unemployed = rows;
    const listUnemployed = Unemployed.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "Unemployed",
          message: "Select the Unemployed to update:",
          choices: listUnemployed,
        },
      ])
      .then((answer) => {
        let UnemployedId = answer.Unemployed;

        joblessdb.allRoles().then(([rows]) => {
          let roles = rows;
          const listRoles = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role_id",
                message: "Select the new role for the Unemployed:",
                choices: listRoles,
              },
            ])
            .then((answer) => {
              let newRoleId = answer.role_id;
              joblessdb.updateUnemployedRole(newRoleId, UnemployedId);
              console.log(`Unemployed role has been successfully updated.`);
            })
            .then(() => promptMenu());
        });
      });
  });
}

// Start the application by calling the main menu function
mainMenu();
