
INSERT INTO department(department_name) 
VALUES 
('sales'), 
('engineering'),
('support'),
('HR');

INSERT INTO role(title, salary, department_id) 
VALUES 
('sales person', 50000, 1),
('engineer', 70000, 2),
('tech support', 55000, 3),
('human resources', 75000, 4);


INSERT INTO employee(first_name, last_name, role_id)
VALUES 
('John', 'Doe', 1), 
('Peter', 'Pan', 2), 
('David', 'Smith', 3), 
('Anthony', 'Pope', 4),
('Tony', 'Stark', 2),
('George', 'Clooney', 1);
