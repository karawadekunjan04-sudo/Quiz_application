# Quiz Application

A web-based Quiz Application developed using Java and Spring Boot. The application provides REST APIs to manage quiz questions and retrieve questions based on categories, making it easier to build and manage online quizzes.

## 🚀 Features

- Retrieve all quiz questions.
- Fetch questions based on a specific category.
- Generate random questions for quizzes.
- RESTful API endpoints for question management.
- Database integration for storing quiz questions.

## 🛠️ Tech Stack

- **Backend:** Java, Spring Boot
- **REST API:** Spring Web
- **Database:** MySQL
- **Data Access:** Spring Data JPA / Hibernate
- **Build Tool:** Maven
- **API Testing:** Postman

## 📂 Project Structure

```text
Quiz_application/
├── src/
│   └── main/
│       ├── java/
│       │   ├── com/Controller/
│       │   │   └── quizController.java
│       │   ├── com/Service/
│       │   │   └── quizService.java
│       │   ├── com/dao/
│       │   │   └── quizDAO.java
│       │   └── Entity/
│       │       └── Question.java
│       └── resources/
│           └── application.properties
├── pom.xml
└── README.md
```

*Note: Adjust the package and file names above if your actual project structure differs.*

## ⚙️ Prerequisites

Make sure you have installed:

- Java JDK
- Maven
- MySQL Server
- Eclipse IDE or another Java IDE
- Postman (optional, for API testing)

## 🔧 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/karawadekunjan04-sudo/Quiz_application.git
```

### 2. Open the Project

Import the project into Eclipse as an existing Maven project.

### 3. Configure MySQL

Create a database in MySQL and update your `src/main/resources/application.properties` file with your database name and credentials.

Example configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quizdb
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace `quizdb`, `YOUR_USERNAME`, and `YOUR_PASSWORD` with your actual database details.

### 4. Run the Application

Run the Spring Boot main application class from Eclipse, or use:

```bash
mvn spring-boot:run
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/question/allquestions` | Retrieve all questions |
| GET | `/question/category/{category}` | Retrieve questions by category, if implemented |

The endpoint paths depend on your controller mappings. Update this table to match your actual code.

## 🧪 Testing

You can test the API endpoints using Postman or a web browser for GET requests.

Example:

```http
GET http://localhost:8080/question/allquestions
```

Replace `8080` with your application's configured port if different.

## 🎯 Project Objective

The main objective of this project is to develop a backend system for an online quiz platform using Spring Boot and REST APIs. It demonstrates backend development concepts such as layered architecture, database integration, and retrieving quiz questions through API endpoints.

