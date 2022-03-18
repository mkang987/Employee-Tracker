INSERT INTO department (name)
VALUES
    ('Accounting'),
    ('Sales'),
    ('Design'),
    ('Engineer'),

INSERT INTO role (title, salary, department_id)
VALUES
    ('Accounting Manager', 120000.00, 1),
    ('Customer Service', 55000.00, 2),
    ('UI/UX Designer', 60000.00, 3),
    ('Senior Developer', 115000.00, 4),
    ('Junior Developer', 90000.00, 4),
    ('Data Analyst', 85000.00, 1),
    ('Lead Sales', 82000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Moon', 'Kang', 5, 2),
    ('Sujil', 'Maharjan', 4, NULL),
    ('Jason', 'Osun', 2, 5),
    ('Steve', 'Paper', 2, 5),
    ('Vince', 'Sailer', 7, NULL)
    ('Jimmy', 'Money', 1 , NULL),
    ('Stacy', 'Adams', 3, NULL),
    ('Hana', 'Sim', 6, NULL);