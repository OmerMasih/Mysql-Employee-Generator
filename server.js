const inquirer = require("inquirer");
const db = require("./connection");

const questions = () => {
  inquirer
    .prompt([
      {
        name: "prompt",
        type: "list",
        message: "What do you like to do?\n Please select from following:",
        choices: [
          "Show all departments",
          "Show all roles",
          "Show all employees",
          "Add a department into your table",
          "Add a role into your table",
          "Add an employee into your table",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.prompt) {
        case "Show all departments":
          AllDepartment();
          break;
        case "Show all roles":
          allRoles();
          break;
        case "Show all employees":
          allEmployees();
          break;
        case "Add a department into your table":
          updatDepartment();
          break;
        case "Add a role into your table":
          updateRole();
          break;
        case "Add an employee into your table":
          updateEmployee();
          break;
        case "Update an employee role":
          EmpRole();
          break;
        case "Quit":
          db.end();
          break;
      }
    });
};
const updatDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department",
      },
    ])
    .then((data) => {
      db.query("Insert into department set?", {
        name: data.departmentName,
      });
      questions();
    });
};

const updateRole = () => {
  db.query("SELECT * FROM department", (err, res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title or position of the new role? ",
        },
        {
          type: "input",
          name: "salary",
          message: "How much is the salary of the new role? ",
        },
        {
          type: "list",
          name: "department",
          message: "What department does the  new role related to? ",
          choices: res.map((department) => department.name),
        },
      ])
      .then((data) => {
        const departmentName = res.find(
          (department) => department.name === data.department
        );
        db.query("INSERT INTO role set ?", {
          title: data.title,
          salary: data.salary,
          department_id: departmentName.id,
        });

        questions();
      });
  });
};

const updateEmployee = () => {
  db.connect((err) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the first name the employee?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the last name of the employee?",
        },
        {
          type: "input",
          name: "role_id",
          message: "What is the role ID of the employee?",
        },
      ])
      .then((answers) => {
        db.query("INSERT INTO employee SET ?", answers, (err, res) => {
          if (err) throw err;
          console.log("Employee added successfully.");
          db.end();
        });
      });
  });
};

const EmpRole = () => {
  db.connect((err) => {
    if (err) throw err;

    db.query("SELECT * FROM employee", (err, employees) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update? ",
            choices: employees.map(
              (employee) => `${employee.first_name} ${employee.last_name}`
            ),
            type: "input",
            name: "role_id",
            message: "What is the new role ID for this employee?",
          },
        ])
        .then((answers) => {
          const employee = employees.find(
            (employee) =>
              `${employee.first_name} ${employee.last_name}` ===
              answers.employee
          );

          db.query(
            "UPDATE employee SET role_id = ? WHERE id= ?",
            [answers.role_id, employee.id],
            (err, res) => {
              if (err) throw err;
              console.log("Employee updated successfully.");
            }
          );
        });
    });
  });
};

const AllDepartment = () => {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const allRoles = () => {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

const allEmployees = () => {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    questions();
  });
};

questions();
