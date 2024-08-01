
CREATE DATABASE IF NOT EXISTS hyperDriveDataBase;
USE hyperDriveDataBase;

CREATE TABLE IF NOT EXISTS Candidates (
    candidate_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('1', '2', '3') NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    date_of_birth DATE,
    place_of_birth VARCHAR(100),
    unknown_birth_date BOOLEAN DEFAULT FALSE,
    blood_type ENUM('O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'),
    id_card_number VARCHAR(50),
    group_id INT,
    profile_photo_path VARCHAR(255),
    FOREIGN KEY (group_id) REFERENCES Groups(group_id)
);

CREATE TABLE IF NOT EXISTS Groups (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS TrafficLawsLessons (
    lesson_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    date DATE NOT NULL,
    lesson_number INT NOT NULL,
    attendance BOOLEAN NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);

CREATE TABLE IF NOT EXISTS DrivingSessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    date DATE NOT NULL,
    session_type ENUM('Theory', 'Practical') NOT NULL,
    attendance BOOLEAN NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);

CREATE TABLE IF NOT EXISTS Exams (
    exam_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    exam_type ENUM('Traffic Laws', 'Practical') NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status ENUM('Passed', 'Failed') NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);

CREATE TABLE IF NOT EXISTS Debts (
    debt_id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    amount_due DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);
