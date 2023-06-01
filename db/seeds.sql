USE unemployed;

INSERT INTO department (name)
VALUES
    ('Recruiter'),
    ('Marketing'),
    ('Players');


INSERT INTO role (title, salary, department_id)
VALUES 
    ('Team Manager', 166000, 1),
    ('Keyboard Cleaner', 32000, 2),
    ('Mouse Cleaner', 32000, 2),
    ('Intern', 15000, 1),
    ('Gamer', 100000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Geoferey', 'Guillo', 1, NULL),
    ('Edgar', 'DeLeon', 3, 2),
    ('Joshua', 'Boren', 4, 1),
    ('Durin', 'Longbeard', 2, NULL),
    ('Luffy', 'Cap', 4, NULL);