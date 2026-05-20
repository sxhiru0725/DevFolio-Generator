## 1. Introduction

Hi, my name is Sahiru Hennadige. This is my Developer Portfolio Generator project built using the MERN stack.

The app allows users to create a developer portfolio by filling out a form or importing details from a CV PDF.

## 2. Home Page

This is the home page. It introduces the platform and includes a clear Create Portfolio call to action.

## 3. Create Portfolio Page

This is the create portfolio page. The user can manually enter their personal information, contact links, skills, projects, and experience.

I also added a CV import feature. The user can upload a PDF CV and the app extracts available details such as name, email, skills, and projects. The user can still review and edit everything before publishing.

## 4. Preview Page

After filling the form, the user clicks Preview Portfolio. This page shows a read only version of how the portfolio will look before publishing.

## 5. Publish and Public Portfolio Page

When the user clicks Publish Portfolio, the data is saved to MongoDB and a public portfolio page is created using a unique username route.

For example:

```txt
/portfolio/sahiru3
```

The portfolio page includes header, about me, skills, projects, experience, contact, resume link, and view count.

## 6. Edit Portfolio Page

The user can also edit an existing portfolio. The form is pre filled with the current data and updates are saved using the PUT API.

## 7. Backend API

The backend is built with Node.js, Express, MongoDB, and Mongoose.

The main API endpoints are:

```txt
POST /api/portfolio
GET /api/portfolio/:username
PUT /api/portfolio/:username
DELETE /api/portfolio/:username
```

Here is the backend JSON response showing the portfolio data saved in MongoDB.

## 8. Closing

Overall, this project demonstrates a full stack MERN workflow with dynamic forms, API routes, MongoDB storage, public portfolio pages, edit functionality, CV import, and a responsive UI.
