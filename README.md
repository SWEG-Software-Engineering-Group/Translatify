# Translatify

Translatify is the SWE project written in TypeScript, React using AWS technology, realized as part of the Software Engineering Project course at the University of Padua, in 2022-2023, supervised by Zero12 S.r.l.

## Getting Started

- Clone the repository
- Add a .env file containing the authentication token to be used in the API calls: REACT_APP_API_KEY="" (contact us for obtaining the key to type into that variable)
- It's advised to wait for a while to have the API from AWS properly loading data inside pages after the first run
- Install dependencies with `npm install`
- Run the app with `npm start`

### Overview

The application is a multi-tenant webapp that allows users to translate text from one language to another. The application is composed of a frontend and a backend. The frontend is a React application that communicates with the backend through a REST API. The backend is a serverless application that uses AWS Lambda functions to handle requests and DynamoDB to store data.
There are three types of users:

- **Guest**: a user that is not logged in. A guest can only access the login and registration pages.
- **User**: a user that is logged in. A user can view the texts to translate and is associated with a single tenant.
- **Admin**: a user that is logged in. An admin can view the texts to translate and has a single tenant associated.
He can also manage his Tenant setting, handling Tenant users and languages, approve or reject the translations and manage the text categories.
- **SuperAdmin**: a user that is logged in. A superadmin can have multiple tenants and for each one can manage users and languages associated.

### Features

- **Login**: a user can log in using his credentials.
- **Registration**: a user can register to the application.
- **Texts**: a user can view the texts to translate.
- **Translation**: a user can translate a text from one language to another.
- **Tenant**: an Admin can manage his Tenant settings.
- **Tenant users**: an Admin can manage his Tenant users.
- **Tenant languages**: an Admin can manage his Tenant languages.
- **Tenant categories**: an Admin can manage his Tenant categories.
- **Tenant translations**: an Admin can approve or reject the translations.
- **SuperAdmin**: a SuperAdmin can manage multiple tenants.
- **SuperAdmin users**: a SuperAdmin can manage users for each tenant.
- **SuperAdmin languages**: a SuperAdmin can manage languages for each tenant.

### Technologies

- **React**: a JavaScript library for building user interfaces.
- **TypeScript**: a programming language developed and maintained by Microsoft.
- **AWS Lambda**: a serverless computing service provided by Amazon Web Services.
- **AWS DynamoDB**: a fully managed proprietary NoSQL database service that supports key-value and document data structures.
- **AWS API Gateway**: a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.
- **AWS Cognito**: a simple user identity and data synchronization service that helps you securely manage and synchronize app data for your users across their mobile devices.
- **AWS Amplify**: a set of tools and services that enables mobile and front-end web developers to build secure, scalable full stack applications, powered by AWS.

### Test

Run `npm run test` to run the right command set as script to get MUI/Axios modules working properly.
Also, click "a" to run all tests.
