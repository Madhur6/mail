# Madhur

# CS50 Web Project 3 - Mail

Welcome to my CS50 Web Project 3 repository! This project is an implementation of a simple email client that allows users to send, receive, and manage emails. The application supports key features like sending emails, managing mailboxes, viewing emails, marking emails as read/unread, archiving, and replying.

## Overview

This project is part of CS50 Web Programming with Python and JavaScript. The goal is to gain a deeper understanding of Django, JavaScript, and frontend-backend interaction while creating a functional email client.

## Features

- **Send Mail**: Compose and send emails to recipients.
- **Mailbox**: View different mailboxes like inbox, sent, and archived.
- **View Email**: Open and read individual emails.
- **Read/Unread**: Mark emails as read or unread.
- **Archive**: Archive emails for organization.
- **Unarchive**: Retrieve emails from the archive.
- **Reply**: Reply to received emails.

## Technologies Used

- **Django**: Used for the backend logic, including handling requests and database management.
- **JavaScript**: Used to enhance interactivity on the frontend.(static/mail/inbox.js)
- **HTML/CSS**: Used for structuring the webpage and applying styles.

## Usage

1. Clone the repository to your local machine using `git clone`.
2. Make sure you have Django installed (`pip install Django`).
3. Navigate to the project directory.
4. Run `python manage.py runserver` to start the Django development server.
5. Open your web browser and visit `http://127.0.0.1:8000` to access the email client.

## Folder Structure

- `mail/`: Contains the Django application code.
- `static/`: Holds static files like CSS and JavaScript(inbox.js).
- `templates/`: Contains HTML templates for rendering views.
- `manage.py`: Django management script.


## JavaScript Usage (inbox.js)

The `inbox.js` file plays important role in enhancing the interactivity and user experience of the email application. It utilizes JavaScript to dynamically load mailbox content, compose and send emails, view detailed email information, mark emails as read/unread, archive/unarchive emails, and manage user actions. Here's an overview of how `inbox.js` works:

- **Event Listeners**: The `DOMContentLoaded` event listener ensures that JavaScript code runs once the page's content is loaded. Event listeners are set up for various buttons (Inbox, Compose, Sent, Archived) to trigger appropriate actions.

- **Compose Mail**: Clicking the "Compose" button triggers the `compose_mail` function, which displays the compose view and prepares the form for sending emails.

- **Sending Emails**: The `send_mails` function captures user inputs, sends a POST request to the backend API to compose and send emails, and then loads the "Sent" mailbox.

- **Loading Mailboxes**: The `load_mailbox` function fetches mailbox data from the backend API and dynamically updates the mailbox view, including email details and styles (read/unread).

- **Viewing Email Details**: The `detailed_mail` function fetches detailed email information and displays it in the detail view. It also handles marking emails as read and archiving/unarchiving emails.

- **Replying to Emails**: The "Reply" button is dynamically added using JavaScript in the detailed view. Clicking the "Reply" button triggers the `compose_mail` function with pre-filled data for replying to the selected email.

- **Display Functions**: The `display_mail` and `details` functions generate HTML markup for displaying email summaries and details, respectively.


## Backend Logic (views.py)

The `views.py` file contains Django views that handle backend logic for the email application. It interacts with the frontend, processes user requests, communicates with the database, and responds with appropriate data. Here's an overview of how `views.py` functions:

- **Index View**: The `index` view determines whether the user is authenticated. Authenticated users are directed to their inbox, while others are prompted to sign in.

- **Compose View**: The `compose` view handles POST requests to compose and send emails. It validates recipient emails, converts them to users, and creates email records in the database.

- **Mailbox View**: The `mailbox` view returns email data based on the selected mailbox. It filters emails based on mailbox type (inbox, sent, archived), orders them chronologically, and serializes the data for JSON response.

- **Email View**: The `email` view manages individual email requests. It retrieves email details, handles updating email properties (read, archived), and responds with appropriate data.


## Interaction Between Frontend and Backend

- Frontend: JavaScript in `inbox.js` sends fetch requests to the backend API endpoints.
- Backend: Django views in `views.py` process requests, query the database, and respond with serialized data.
- Interaction: JavaScript dynamically updates the webpage based on the received data from the backend.

  This synergy between frontend and backend ensures smooth user interactions and efficient data management in the email application.



## Acknowledgments

I'd like to express my gratitude to the CS50 staff and community for their guidance and support during the development of this project.


Feel free to reach out if you have any questions or feedback. Happy coding!

