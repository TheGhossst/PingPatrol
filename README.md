# PingPatrol

PingPatrol is a cutting-edge website monitoring application designed to help you track uptime, response times, and the overall health of your web applications. Built with modern technologies like Next.js 15, Firebase, and real-time monitoring capabilities, PingPatrol ensures you're always informed about your websites' performance.

---

## Features

### 🚀 Core Features

- **Website Monitoring**
  - Continuous uptime tracking
  - Response time measurements
  - Historical performance data
  - Instant status checks

- **User Authentication**
  - Secure email/password login
  - Google authentication integration
  - Protected routes and data security

- **Dashboard Analytics**
  - Comprehensive uptime statistics
  - Interactive response time graphs
  - Performance trend analysis
  - Real-time status updates

### 💡 Additional Features

- **Public Status Checker**
  - Check any website's status without authentication
  - Instant response time results
  - User-friendly interface
---

## Technology Stack

### **Frontend**
- Next.js 15
- React 19
- Tailwind CSS

### **Backend**
- Firebase Authentication
- Firebase Firestore
- Next.js API Routes

### **Monitoring**
- Custom monitoring engine
- Real-time data synchronization
- Serverless architecture

---

## Getting Started

Follow these steps to set up PingPatrol locally:

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0 or later)
- **npm** or **yarn**
- A Firebase account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TheGhossst/PingPatrol
   cd PingPatrol
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and include the following variables:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Project Structure

Here's an overview of the project structure:

```plaintext
pingpatrol/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── context/          # React context
│   └── [other routes]    # Application routes
├── public/               # Static assets
└── ...config files
```

---

## Usage

### Adding a Website to Monitor

1. Log in to your account.
2. Click on the **"Add Website"** button in the dashboard.
3. Enter the website URL you want to monitor.
4. (Optional) Configure advanced monitoring settings.
5. Click **"Start Monitoring"** to begin tracking.

### Checking Website Status

1. Go to the home page.
2. Use the **Public Status Checker** feature.
3. Enter the URL of the website you want to check.
4. Instantly view uptime and response time results.

---

## Contributing

We welcome contributions to PingPatrol! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with descriptive messages.
4. Push your branch and create a pull request.
