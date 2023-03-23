
INSERT INTO department (name)
values
('Finance'),
('Marketing'),
('Human Resources'),
('Sales'),
('Legal');


INSERT INTO role (title, salary, department_id)
values
('Finance Manager', 76900.00, 1),
('Accountant', 39900.00, 1),
('Marketing Manager', 40578.00, 1),
('Customer Care Rep', 69670.00, 2),
('HR Manager', 72800.00, 1),
('HR Generalist', 62470.00, 3),
('Customer Care Manager', 75740.00, 1),
('Sales Executive', 40080.00, 4),
('Lawyer', 92590.00, 1),
('Lawyer Assistant', 78450.00, 5);


INSERT INTO employee ( first_name, last_name, role_id, manager_id)
values
('John', 'Guidry', 1, NULL),
('Masihullah', 'Omer', 2, 1),
('Abdul', 'Ghafor', 3, NULL),
('Liz',   'Yong', 4, 1),
('Hamidullah', 'Anosh', 5, NULL),
('James', 'Gordon', 6, 1),
('Kate', 'Winselt', 7, NULL),
('Ahmad', 'Ali', 8, 1),
('Bob', 'Logan', 9, NULL),
('Steve', 'Tedd', 10, 1);