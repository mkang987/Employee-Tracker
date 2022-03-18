INSERT INTO department (name)
VALUES
    ('Accounting'),
    ('Sales'),
    ('Design'),
    ('Engineer');

INSERT INTO role (title, salary, department_id)
VALUES  ('Accounting Manager', 120000, 1),
        ('Customer Service', 55000, 2),
        ('UI/UX Designer', 60000, 3),
        ('Senior Developer', 115000, 4),
        ('Junior Developer', 90000, 4),
        ('Data Analyst', 85000, 1),
        ('Lead Sales', 82000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Sujil', 'Maharjan', 4, NULL),
        ('Moon', 'Kang', 5, 1),
        ('Vince', 'Sailer', 7, NULL),
        ('Jason', 'Osun', 2, 3),
        ('Steve', 'Paper', 2, 3),
        ('Jimmy', 'Money', 1, NULL),
        ('Stacy', 'Adams', 3, NULL),
        ('Hana', 'Sim', 6, NULL);