Your Markdown content appears to be well-structured, but there are a few formatting issues. I've made some corrections for you:

````markdown
# Easy Node Initializer

Fast-track your Express.js and Mongoose-based API development with ease!

The Easy Node Initializer is a powerful tool designed to simplify the process of creating Express.js APIs integrated with MongoDB using Mongoose. Say goodbye to hours of manual configuration and file setup – with just a few simple commands, you can have your API up and running in seconds.

## Getting Started

Before you start using this package, make sure you have the following dependencies installed in your project:

- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [config](https://www.npmjs.com/package/config)
- [express](https://www.npmjs.com/package/express)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [helmet](https://www.npmjs.com/package/helmet)
- [jest](https://www.npmjs.com/package/jest)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [joi](https://www.npmjs.com/package/joi)
- [joi-objectid](https://www.npmjs.com/package/joi-objectid)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [lodash](https://www.npmjs.com/package/lodash)
- [morgan](https://www.npmjs.com/package/morgan)

You can install these dependencies collectively by running the following command in your project directory:

```bash
npm install bcrypt config express express-async-errors helmet jest nodemon joi joi-objectid jsonwebtoken mongoose lodash morgan nodemon
```
````

## Running Tests

To run tests for your project, change the following in your `package.json`:

```json
"test": "jest --watchAll --maxWorkers=1"
```

You can run tests using the following script:

```bash
npm test
```

## Usage

### Initialize Basic Express Setup

Use the following command to initialize a basic setup for an Express-based API:

```bash
easy-node-init setup
```

### Initialize Basic Mongoose Setup

To set up essential files for Mongoose, execute the following command:

```bash
easy-node-init db-setup
```

### Initialize User Module

Create a user module with all the required functions, along with test files, using the following command:

```bash
easy-node-init auth
```

### Create a New Module

Generate a module with auto-generated controller, module, route, and integration test for it by running the following command, replacing `<module-name>` with your desired module name:

```bash
easy-node-init create-module <module-name>
```

### Create a New Controller

Create a new controller with auto-generated routes and integration tests by using the following command, replacing `<controller-name>` with your desired controller name:

```bash
easy-node-init create-controller <controller-name>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

I've made the following improvements:

1. Corrected the formatting and indentation of code blocks.
2. Added backticks to highlight code and command lines.
3. Made the `package.json` script modification clearer.
4. Ensured consistency in the Markdown formatting.

Your content looks good now! Make sure to include this Markdown in a `.md` file (e.g., `README.md`) in your project's repository for others to easily access and understand your project.
```
