# 🌿 Botanical Bliss – Online Gardening & Plant Store

**Botanical Bliss** is a full-stack gardening e-commerce website designed to make buying plants and gardening essentials easier. It combines an online plant store with gardening assistance features, helping users explore products, manage their shopping activities, and learn how to care for their plants.

The project also includes an administrative dashboard for managing products, users, orders, inventory, and sales analytics.

## ✨ Features

### 🛍️ User Features
- **User Authentication:** Secure registration and login using password hashing and JWT-based authentication.
- **Product Browsing:** Explore plants, seeds, fertilizers, and gardening tools.
- **Advanced Product Search:** Search and filter products, sort results, and filter products by stock availability.
- **Shopping Cart:** Add products to the cart and manage cart items.
- **Wishlist:** Save favorite gardening products for later.
- **Order Management:** Access order-related features and manage shopping activities.
- **Product Reviews:** Share product feedback with star ratings and optional images.

### 🌱 Gardening Features
- **Gardening Guide:** Access useful gardening tips and plant-care information.
- **Plant Doctor:** Explore guidance for common plant problems, including yellow leaves, wilting, brown tips, pests, slow growth, and lack of flowers.
- **Garden Calendar:** Organize plant-care tasks and personal gardening reminders.
- **Seasonal Gardening Guide:** Follow seasonal gardening tasks and track completed activities.
- **Garden Gallery:** Share garden photos and captions with other users and interact with posts through a like system.

### 🔐 Admin Dashboard
- **Dashboard Analytics:** View key statistics for products, orders, users, and pending orders.
- **Product Management:** Add, view, edit, and manage product information.
- **User Management:** View registered users and manage user-related information.
- **Order Management:** Monitor order information and order statuses.
- **Sales Analytics:** Analyze revenue and order trends over 7-day, 30-day, and 3-month periods.
- **Revenue Tracking:** View total revenue, today's revenue, and monthly revenue.
- **Inventory Alerts:** Identify low-stock products.
- **Best-Selling Products:** Review product sales performance.
- **Recent Users:** View recently registered users.
- **Responsive Interface:** Use the website across desktop and mobile screens.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Frontend functionality and interactivity |
| Bootstrap | Responsive UI components |
| Bootstrap Icons | Interface icons |
| Node.js | Backend runtime |
| Express.js | Backend framework and REST APIs |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Chart.js | Sales analytics charts |
| Git & GitHub | Version control and source code hosting |
| Render | Application deployment |

## 🏗️ Project Architecture

Botanical Bliss follows a client-server architecture.

```text
Botanical Bliss
│
├── frontend/
│   ├── HTML Pages
│   ├── CSS Stylesheets
│   ├── JavaScript Files
│   └── Admin Pages
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── Controllers / API Logic
│
├── .env
├── .gitignore
└── README.md
```

*Note: The structure above is a simplified overview. Adjust the folder names to match the actual structure of your repository.*

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account or another configured MongoDB database
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/misbahsofi574-netizen/botanical-bliss.git
```

### 2. Navigate to the Project

```bash
cd botanical-bliss
```

### 3. Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the location expected by your backend configuration and add your own configuration values.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

**Important:** Use the exact environment variable names required by your backend code. Never commit your actual database credentials, JWT secret, or other private keys to GitHub.

### 5. Start the Backend Server

Run the command from the backend directory:

```bash
node server.js
```

The backend should start on the configured port, typically `5000`.

### 6. Run the Frontend

Open the frontend's `index.html` using a local development server or configure the frontend to communicate with your running backend.

Ensure that the frontend API base URL points to your local backend during local development.

## 🌐 Live Demo

- **Live Website:** https://botanical-bliss-52ra.onrender.com

https://botanical-bliss-52ra.onrender.com/api/products

## 🔒 Security

- Passwords are hashed before storage using bcryptjs.
- JWT-based authentication is used to protect authenticated routes.
- Role-based access control separates regular users from administrators.
- Sensitive configuration values should be stored in environment variables.

## 🎯 Project Objectives

- Develop a functional online store for plants and gardening products.
- Provide users with a convenient shopping experience.
- Offer useful gardening and plant-care resources.
- Simplify product, order, user, and inventory management.
- Present sales information through a dedicated analytics dashboard.
- Apply full-stack web development concepts to a practical project.

## 🚀 Future Enhancements

- Real-time order tracking.
- Email notifications for order updates and gardening reminders.
- Enhanced product recommendations.
- Additional payment gateway improvements.
- More advanced gardening assistance and community features.

## 👩‍💻 Developer

**Misbah Sofi**

BCA Student | Full-Stack Web Development Project

GitHub: [@misbahsofi574-netizen](https://github.com/misbahsofi574-netizen)

---

*Botanical Bliss – Bringing greenery closer to everyone, one plant at a time.* 🌿
