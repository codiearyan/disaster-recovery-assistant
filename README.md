Here's a README template to help you document the Disaster Recovery Assistant (DRA) project:

---

# Disaster Recovery Assistant (DRA)

DRA is a comprehensive platform designed to assist with disaster preparedness, response, and recovery. It provides real-time alerts, location-based information, news, a chatbot for guidance, and tools for volunteers to organize and join recovery programs.

## Video Demo Link -  [Click Here](https://www.loom.com/share/2ee48f03d0e84a5ca16dfb60286d9ee0?sid=4ce40acd-92a8-4aff-a091-5fbef7551587)

## Project Structure

The project is divided into two main parts:
1. **Frontend**: A React (TypeScript) application for user interaction.
2. **Backend**: A FastAPI server handling API requests and integration with external services.

### Folder Structure

```plaintext
disaster-recovery-assistant/
├── frontend/              # Frontend application in React (TypeScript)
│   ├── src/
│   │   ├── components/    # UI components divided by feature
│   │   ├── pages/         # Pages such as Alert, Home, Precaution, VolunteerPage
│   │   ├── services/      # Services to handle API requests
│   │   ├── store/         # Redux slices and store configuration
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
├── backend/               # Backend application in FastAPI (Python)
│   ├── app/
│   │   ├── routers/       # API routers for chatbot, GDACS, news, volunteer features
│   │   ├── schemas/       # Pydantic schemas for data validation
│   │   ├── config/        # Configuration files for database and email
│   │   ├── services/      # Core business logic for chatbot, news, and volunteer
│   │   └── main.py
│   ├── requirements.txt
└── README.md
```

## Features

- **Alerts**: Location-based disaster alerts and updates via GDACS.
- **News**: Up-to-date news displayed in a marquee format.
- **Chatbot**: Interactive chatbot offering disaster-related guidance and information.
- **Volunteer Programs**: Tools for creating and joining volunteer programs, supporting community-based disaster recovery.

## Technology Stack

- **Frontend**: React (TypeScript) for a responsive, component-based UI.
- **Backend**: FastAPI for efficient, asynchronous API handling.
- **Database**: Firebase for data storage.
- **Authentication**: Clerk for secure and user-friendly authentication.

## Installation

### Prerequisites

- Node.js and npm for frontend development
- Python 3.8+ for backend development
- Firebase setup for database services
- Clerk account for authentication

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd disaster-recovery-assistant/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd disaster-recovery-assistant/backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables in `.env`:
   ```plaintext
   DATABASE_URL=<your_firebase_database_url>
   CLERK_SECRET_KEY=<your_clerk_secret_key>
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Usage

- **Access Frontend**: The frontend application runs by default on `http://localhost:3000`.
- **API Endpoints**: The FastAPI server is available at `http://localhost:8000`.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

---
