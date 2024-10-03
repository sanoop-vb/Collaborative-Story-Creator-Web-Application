# Collaborative Story Creator

## Project Overview

Collaborative Story Creator is a web application that allows users to collaboratively write stories. Users can create a new story, contribute to ongoing stories, and view completed ones. The app provides authentication for users, with protected routes for contributing and managing stories. Only the author or an admin can delete stories, ensuring control over the content.

## Features

- User authentication and authorization (login, registration)
- Create and view stories
- Contribute to existing stories
- View contributions made by users
- Responsive design for mobile and desktop views

## Technologies Used

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Django, Django REST Framework
- **Database:** postgreSQL 
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Python 3.x
- React js & npm
- Django
- Django REST Framework

1. **Clone the Repository:**
   Open your terminal and run the following command to clone the repository:
   ```bash
   git clone <repository-url>
   cd collaborative-story-creator

###Set Up the Backend: Navigate to the backend directory:
cd backend

###Create a virtual environment and activate it:
python -m venv venv
### Activate the virtual environment
### On Windows
venv\Scripts\activate
### On macOS/Linux
source venv/bin/activate

###Install the required packages:
pip install -r requirements.txt


###Set Up the Frontend: Navigate to the frontend directory:
cd ../frontend


###Install the required packages:
npm install


###Running the Application
Start the Backend Server: In the terminal, navigate to the backend directory and run:

cd backend
python manage.py runserver


###Start the Frontend Development Server: In a new terminal window, navigate to the frontend directory and run:
cd ../frontend
npm start
Access the Application: Open your web browser and go to http://localhost:3000 to view the application.
