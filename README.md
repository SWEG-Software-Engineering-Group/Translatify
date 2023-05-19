<a name="readme-top"></a>
# Translatify

Translatify is the SWE project written in TypeScript, React using AWS technology, realized as part of the Software Engineering Project course at the University of Padua, in 2022-2023, supervised by Zero12 S.r.l.

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/SWEG-Software-Engineering-Group/SWEG-Software-Engineering-Group.github.io/blob/main/img/sweg_logo.png" alt="Logo of the organization SWEG" width="240" height="70">
  </a>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#backoffice">Backoffice</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#technologies">Technologies</a></li>
      </ul>
    </li>
    <li>
      <ul>
        <li><a href="#test">Test</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Hosted on Amazon Web Services this software offers a multiplatform backend where an organization can add and translate texts in different languages and an API library to allow to retrive the texts in the desired language and use them on their own Websites and Web Applications as pleased. 

### Backoffice

This repo contains the main software with the backoffice frontend part that run under the usage of our AWS APIs. It features all the lambdas functions available. The data is stored in dynamoDB. Cognito is used to secure all the functions that are used by the translating process for the organization, while the other funcions to retrive the texts are public. A Postman json is included with the list of all the different functions available.

_For more examples, please refer to the [Documentation](https://github.com/SWEG-Software-Engineering-Group/SWEG-Software-Engineering-Group.github.io/blob/main/pb/esterni/Manuale%20Sviluppatore/Manuale%20Sviluppatore.pdf), only available in italian at the moment_
_To refer to our API repo, please follow the [Link](https://github.com/SWEG-Software-Engineering-Group/API)_

### Built With

* [![AWS][AWS.com]][AWS-url]
* [![React][React.js]][React-url]
* [![Node][Node.js]][Node-url]
* [![TS][Typescript.js]][Typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

### Prerequisites

Make sure you have the latest version of [npm][npm-url].
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

- Clone the repository
- Add a .env file containing the authentication token to be used in the API calls: REACT_APP_API_KEY="" (contact us for obtaining the key to type into that variable)
- It's advised to wait for a while to have the API from AWS properly loading data inside pages after the first run
- Install dependencies with `npm install`
- Run the app with `npm start`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Overview

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

## Test

Run `npm run test` to run the right command set as script to get MUI/Axios modules working properly.
Also, click "a" to run all tests.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[AWS.com]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[AWS-url]: https://aws.amazon.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Typescript.js]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[npm-url]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
[aws-cli-url]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
