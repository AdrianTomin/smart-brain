# Smart-Brain Project Overview

Smart-Brain is a web application built using Next.js, TypeScript, React, Express, MongoDB, SCSS, Cypress, and Apollo 
GraphQL. Its main functionality revolves around utilizing the Clarifai API for general image recognition.

## Technologies Used

- **Next.js**: Next.js is used as the framework for building React applications, providing server-side rendering, and other features.
- **TypeScript**: TypeScript is used for type-checking and adding static types to JavaScript code, enhancing development productivity and code maintainability.
- **React**: React is used for building the user interface components of the application, providing a dynamic and responsive user experience.
- **Express**: Express.js is used as the backend framework to handle server-side logic and API requests.
- **MongoDB**: MongoDB is used as the database to store and manage application data.
- **SCSS**: SCSS (Sass) is used as the CSS preprocessor to enhance styling capabilities and maintainability.
- **Cypress**: Cypress is used for end-to-end testing of the application, ensuring its functionality across different scenarios.
- **Apollo GraphQL**: Apollo GraphQL is used to implement GraphQL on the server-side, enabling efficient data fetching and management.

## Main Functionality

The main functionality of this project is centered around utilizing the Clarifai API for general image recognition. Users can upload images, and the application uses the Clarifai API to analyze and recognize the contents of the images, providing relevant information or insights.

## Running the Application Locally

To run the application locally, follow these steps:

1. Clone the repository from GitHub: `git clone https://github.com/AdrianTomin/smart-brain`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
## API Key Configuration

To run the application locally, you need to obtain API keys from two services: MongoDB and Clarifai.

### MongoDB URI

1. **Sign up or log in to MongoDB**: If you don't have an account, you can sign up for free at [MongoDB](https://www.mongodb.com/).
2. **Create a new project**: Once logged in, create a new project where you will host your database.
3. **Get your MongoDB URI**: After creating a project, navigate to the project dashboard and locate the "Clusters" section. Click on "Connect" for the cluster you created, then select "Connect your application" and copy the provided URI. This URI will be used to connect your application to MongoDB.
4. **In /backend,** create a file called .env and add the following variable to connect to MongoDB:

*   **MONGO_URI=["your_mongo_uri"] (without the brackets)**

### Clarifai API Key

1. **Sign up or log in to Clarifai**: If you don't have an account, sign up for free at [Clarifai](https://clarifai.com/login).
2. **Create a new application**: Once logged in, click on the "create" button and fill out the information to create
   a new app.
3. **Gather API Keys**: Once you have created a new app, navigate to the Clarifai model we will be using [here]
   (https://clarifai.com/clarifai/main/models/general-image-recognition). Click on "Use Model", "Call by API", then 
   "Javascript". Here you will be able to see the values that we need to provide to call the API that we will be 
   using.
4. **In /frontend,** create a file called .env.local and create the following variables with the values that Clarifai 
   provides you with:

*   **NEXT_PUBLIC_PAT=[YOUR_PAT] (without the brackets)**
*   **NEXT_PUBLIC_USER_ID=clarifai**
*   **NEXT_PUBLIC_APP_ID=main**
*   **NEXT_PUBLIC_MODEL_ID=general-image-recognition**
*   **NEXT_PUBLIC_MODEL_VERSION_ID=aa7f35c01e0642fda5cf400f543e7c40**

#### Under /frontend, find the package.json script and run _"start-full"_ to start both the backend and frontend code.
### From here, navigate to http://localhost:3000 and the application should work as expected!