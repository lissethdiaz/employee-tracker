DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department ( 
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
); 

CREATE TABLE role (
    id  INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL, 
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30) NULL, 
    last_name VARCHAR(30) NULL, 
    role_id INT NULL,
    -- CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    manager_id INT NULL, 
    -- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
    PRIMARY KEY (id)
); 