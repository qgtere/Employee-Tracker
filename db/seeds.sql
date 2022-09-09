INSERT INTO department (name)
VALUES ('Sales'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 50000, 1),
       ('Salesperson', 30000, 1),       
       ('Account Manager', 60000, 2),
       ('Accountant', 40000, 2),
       ('Legal Team Lead', 70000, 3),
       ('Lawyer', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carolina', 'Torres', 1, null),
       ('Frida', 'Lopez', 2, 1),       
       ('Erika', 'Castillo', 3, null),
       ('Liz', 'Carreon', 4, 3),
       ('Martha', 'Rojas', 5, null),
       ('Jorge', 'Ramos', 6, 5);       
