INSERT INTO department (name)
VALUES
('Sales'),
('Accounting'),
('Legal'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Manager', 120000, 1),
('Accounting Clerk', 80000, 2),
('Senior Attorney', 160000, 3),
('IT Manager', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Mark', 'Johnson', 4, 3),
('Kim', 'Williams', 2, 1),
('John', 'Harrison', 3, null),
('Lauren', 'Roberts', 1, 3);