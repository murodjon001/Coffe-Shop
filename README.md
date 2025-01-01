# Coffee Shop Network Backend Setup

Follow the steps below to set up and run the backend for the Coffee Shop Network project.

## Prerequisites

- **Node.js:** Ensure you have Node.js version **18.18 or higher** installed.
- **Docker:** Make sure Docker is installed and running on your system.

---

## Installation and Setup

1. **Clone the Repository**  
   Clone the project repository using the following command:
```bash
   git clone git@github.com:murodjon001/Coffe-Shop.git
```

2 **Install Dependencies**
  Navigate to the project directory and install the required dependencies:
```bash
   npm install
```

3 **Set Up Environment Variables**
  Create a .env file in the root directory and copy the content from .env.example:
```bash
   cp .env.example .env
```

4 **Start Docker Services**
  Start the required services using Docker Compose:   
```bash 
  docker compose up -d
```

 5 **Apply Database Migrations**
   Deploy the database migrations: 
  ```bash 
   npx prisma migrate deploy
  ```

6 **Create a Super User**
  Seed the database to create a super user:   
```bash
  npx prisma db seed
 ```

7 **Verify Super User Creation**
  Use Prisma Studio to verify that the super user has been created:
```bash
  npx prisma studio
```

8 **Run the Application**
  Start the application in development mode:
```bash
  npm run start:dev
```

# Documentation

The project documentation is available on Postman:
https://documenter.getpostman.com/view/31351006/2sAYJ6Czhv 



