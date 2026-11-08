# Botanical Bliss – System Architecture

## Overview

Botanical Bliss is a full-stack gardening e-commerce web application that allows users to explore gardening products, manage shopping activities, place orders, and access gardening-related features.

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JWT and bcryptjs
- **Scheduled Tasks:** node-cron
- **Email Service:** Node.js email service
- **Deployment:** Render

## Architecture Components

### 1. Frontend Layer
- Customer storefront
- User authentication
- Product browsing
- Shopping cart and checkout
- Order management
- Wishlist
- Gardening features
- Admin dashboard

### 2. Backend Layer
- REST API routes
- Controllers
- Authentication middleware
- Database configuration
- Email service
- Scheduled reminder processing

### 3. Database Layer

MongoDB Atlas with the following Mongoose models:
- User
- Product
- Order
- GardenPost
- GardenReminder

### 4. Additional Services
- Automated gardening reminder emails
- Payment processing routes
- Application hosting

## System Architecture Diagram

![Botanical Bliss System Architecture](system-architecture.png)

## Architecture Files

- [System Architecture Diagram](system-architecture.png)
- [PDF Documentation](system-architecture.pdf)
- [Editable Draw.io Source](system-architecture.drawio)
- [SVG Architecture Diagram](system-architecture.svg)

---

**Project:** Botanical Bliss
**Category:** Full-Stack Web Application
**Purpose:** Gardening E-commerce and Management Platform
