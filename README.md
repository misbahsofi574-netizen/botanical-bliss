# 🌿 Botanical Bliss – Online Gardening & Plant Store

**Botanical Bliss** is a full-stack gardening e-commerce web application designed to make buying and caring for plants easier. It allows users to explore and purchase plants, manage orders, save favourites, read gardening guides, and receive plant care reminders.

The project combines an interactive shopping experience with gardening resources and an administrative dashboard for managing the store.

## 🌐 Live Demo & Repository

- **Live Website:** https://botanical-bliss-1.onrender.com/home.html
- **GitHub Repository:** https://github.com/misbahsofi574-netizen/botanical-bliss
- **Backend API:** https://botanical-bliss-52ra.onrender.com

## 📸 Screenshots

### Homepage
![Botanical Bliss Homepage](homepage.png.jpeg)

### Shop Page
![Shop Page](screenshots/shop.png)

### Product Details
![Product Details](screenshots/product-details.png)

### Shopping Cart
![Shopping Cart](screenshots/cart.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

> Note: Add the corresponding screenshots to the `screenshots` folder in the project root.

## ✨ Features

### User Features
- User registration and login.
- Browse available plants and gardening products.
- Dynamic product listing from MongoDB.
- Product details and search functionality.
- Product filtering and sorting.
- Shopping cart and checkout.
- Order placement and order management.
- Wishlist functionality.
- User dashboard.
- Gardening guides and articles.
- Plant care reminders.
- Gardening community/gallery with likes.

### Admin Features
- Secure admin authentication.
- Admin dashboard with statistics.
- Product management (add, edit, delete).
- Order management and status updates.
- User management.
- Sales and revenue statistics.
- Low-stock monitoring.

### Technical Features
- RESTful API integration.
- MongoDB database persistence.
- JWT-based authentication.
- Password hashing using bcryptjs.
- Input validation and error handling.
- Loading and error states in API-connected interfaces.
- Responsive design for different screen sizes.

## 🛠️ Technologies Used

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| UI Framework | Bootstrap 5 |
| Icons | Bootstrap Icons |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT, bcryptjs |
| File Uploads | Multer |
| Email | Nodemailer |
| Deployment | Render |
| Version Control | Git & GitHub |

## 📁 Project Structure

```text
botanical_bliss/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── admin/
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── index.html
│   └── ...
│
├── screenshots/
│   ├── homepage.png
│   ├── shop.png
│   ├── product-details.png
│   ├── cart.png
│   └── admin-dashboard.png
│
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run Botanical Bliss locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/misbahsofi574-netizen/botanical-bliss.git
```

### 2. Navigate to the Project

```bash
cd botanical-bliss
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory.

Example configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Add any other environment variables required by your application, such as email, payment gateway, or frontend URL configuration.

**Important:** Never upload your actual `.env` file, database credentials, API keys, or secret keys to GitHub.

### 5. Start the Backend Server

```bash
npm start
```

If your project uses a different development script, use the corresponding script from `backend/package.json`.

The backend should run at:

```text
http://localhost:5000
```

### 6. Run the Frontend

Open the `frontend/index.html` file using VS Code Live Server or another local static web server.

Ensure the frontend API configuration points to:

```text
http://localhost:5000
```

For the deployed version, configure it to use the deployed backend API URL.

## 🔗 Backend API

The backend API is deployed on Render:

https://botanical-bliss-52ra.onrender.com

The API provides endpoints for authentication, products, orders, users, gardening features, and administrative operations.

## 🚀 Deployment

Botanical Bliss uses Render for deployment.

- **Frontend:** Deployed as a static website.
- **Backend:** Deployed as a Node.js web service.
- **Database:** MongoDB Atlas.

The frontend communicates with the deployed backend through REST API requests.

## 🎯 Project Objectives

- Develop a practical full-stack e-commerce application.
- Understand frontend and backend integration.
- Implement database operations using MongoDB.
- Build secure user authentication and authorization.
- Work with REST APIs.
- Understand application deployment and version control.
- Provide gardening-related resources alongside online shopping.

## 📚 Learning Outcomes

Through this project, I gained practical experience in:

- Full-stack web development.
- Node.js and Express.js.
- MongoDB and Mongoose.
- REST API development and integration.
- Authentication and authorization.
- Git and GitHub.
- Application deployment.
- Debugging and error handling.

## 👩‍💻 Developer

**Misbah Sofi**

- GitHub: https://github.com/misbahsofi574-netizen
- LinkedIn: https://www.linkedin.com/in/misbah-sofi-808470384

---

⭐ If you find this project interesting, consider giving the repository a star!

**Botanical Bliss – Grow More. Live Greener. 🌱**