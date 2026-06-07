# NGO Record Manager

A comprehensive field data collection and operational intelligence platform designed for NGOs. This application streamlines the workflow for field workers while providing administrators with real-time analytics and AI-powered insights into organizational impact.

## 🚀 Features

### For Field Workers
- **Google OAuth Integration:** Fast and secure login using existing Google accounts.
- **Worker Dashboard:** Personal overview of submission statistics and recent activities.
- **Structured Reporting:** Submit detailed activity reports including region, beneficiary counts, ground-level issues, and attendance data.
- **Beneficiary Management:** Register new beneficiaries and maintain a directory of individuals receiving services.
- **Profile Management:** Complete personal profiles with primary regions and contact information.
- **Attendance Heatmap:** Visualize activity consistency over the last 30 days.

### For Administrators
- **Admin Command Center:** High-level dashboard showing total organizational reach and attendance.
- **Centralized Report Review:** Search, filter, and manage all field reports from across the organization.
- **Geographic Analytics:** Data visualization (Bar Charts) showing report distribution by region.
- **Personnel Management:** Track and manage the directory of active field workers.
- **AI NGO Intelligence:** Automatic generation of professional operational summaries using **Google Gemini AI**. The AI analyzes verified reports to identify risks, common issues, and provide strategic recommendations.

## 🛠 Tech Stack

### Frontend
- **Framework:** React with Vite
- **UI Components:** Mantine UI
- **Icons:** Lucide-React
- **Charts:** Recharts
- **Networking:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & Google Auth Library
- **AI Integration:** Google Generative AI (Gemini)

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (Local or Atlas)
- Google Cloud Console Credentials (for OAuth)
- Gemini API Key (from Google AI Studio)

### 1. Clone the Project

git clone <your-repo-url>
cd NGO-record-manager


### 2. Backend Configuration

cd backend
npm install

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key


### 3. Frontend Configuration

cd ../frontend
npm install

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000


### 4. Running the Application
**Start the Backend:**

cd backend
npm start
**Start the Frontend:**

cd frontend
npm run dev


## 📦 Deployment (Render)

This project is configured to be deployed as a single web service.

1.  **Build the Frontend:** Run `npm run build` in the `frontend` folder.
2.  **Server Configuration:** The backend is configured in `app.js` to serve the static files from `frontend/dist`.
3.  **Environment Variables:** Add all backend `.env` variables to your Render service environment settings.
4.  **Google OAuth:** Ensure your deployment URL (e.g., `https://your-app.onrender.com`) is added to the **Authorized JavaScript origins** in your Google Cloud Console.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---
*Built as part of the JPMC Bootcamp Project.*