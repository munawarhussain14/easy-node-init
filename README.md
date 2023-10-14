# Easy Node Initializer

Fast-track your Express.js and Mongoose-based API development with ease!

The Easy Node Initializer is a powerful tool designed to simplify the process of creating Express.js APIs integrated with MongoDB using Mongoose. Say goodbye to hours of manual configuration and file setup – with just a few simple commands, you can have your API up and running in seconds.

## Getting Started

Install nodemon by running the following command in your project directory or modify it according to your ease:

```bash
npm i -g nodemon
```

## Installation

Certainly! Here's the command for installing an npm package globally in Markdown format:

**On Windows (run as Administrator):**

```shell
npm install -g easy-node-init
```

**On Linux/macOS (using sudo for superuser privileges):**

```shell
sudo npm install -g easy-node-init
```

To set your secret key in an environment variable run the command:

```shell
export easynodeinti_jwtPrivateKey=<your-secret-key>
```

To enable debugging:

```shell
export debug=app:*
```

To start the server:

```shell
npm start
```

To run tests:

```shell
npm test
```

Make sure to replace `<your-secret-key>` with your actual secret key when setting the `easynodeinti_jwtPrivateKey` environment variable.

## Usage

### Initialize Basic Express Setup

Use the following command to initialize a basic setup for an Express-based API:

```bash
eni setup
```

[Initialize Basic Express Setup](https://www.youtube.com/watch?v=ZlsmPEERouQ)

### Initialize Basic Mongoose Setup

To set up essential files for Mongoose, execute the following command:

```bash
eni db-setup
```

### Initialize User Module

Create a user module with all the required functions, along with test files, using the following command:

```bash
eni auth
```

### Create a New Module

Generate a module with auto-generated controller, module, route, and integration test for it by running the following command, replacing `<module-name>` with your desired module name:

```bash
eni create-module <module-name>
```

### Create a New Controller

Create a new controller with auto-generated routes and integration tests by using the following command, replacing `<controller-name>` with your desired controller name:

```bash
eni create-controller <controller-name>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
