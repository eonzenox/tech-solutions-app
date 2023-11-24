Documentation:

Design Decisions:
Vue 3 and Vuetify 3: I used the latest versions of Vue and Vuetify to take advantage of their updated features, improvements, and better compatibility.

Separation of Concerns: The project follows a modular structure with separate components for the main application, dialogs, and API interactions. This makes the code more organized and maintainable.

CRUD Functionality: CRUD operations are implemented with API endpoints, and corresponding Vue methods handle creating, reading, updating, and deleting customer data.

Vuetify Data Table: The Vuetify data table is used for displaying customer information. It provides a clean and responsive layout with search functionality, pagination, and actions for editing and deleting.

Setup Instructions:

Clone the Repository:

Clone the repository using git clone <repository_url>.
Backend Setup (Assuming .NET 6 is installed):

Navigate to the TechSolutions.Api directory using cd TechSolutions.Api.
Run the API with dotnet run.
The API will be hosted at http://localhost:5150.
Frontend Setup:

Navigate to the tech-solutions-app directory using cd tech-solutions-app.
Install dependencies with npm install.
Run the Vue app with npm run serve.
The Vue app will be available at http://localhost:8080.
Accessing the Application:

Open your browser and go to http://localhost:8080 to access the Vue application.
You can interact with the customer management system, perform CRUD operations, and view the customer list.
