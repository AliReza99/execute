# @arbz/execute

[![npm version](https://img.shields.io/npm/v/@arbz/execute.svg)](https://www.npmjs.com/package/@arbz/execute)
[![npm downloads](https://img.shields.io/npm/dm/@arbz/execute.svg)](https://www.npmjs.com/package/@arbz/execute)

A promisified wrapper for Node.js's `child_process.exec` for easier and more readable async execution of shell commands.

## Installation

Install the package using npm or yarn:

```bash
npm install @arbz/execute
# or
yarn add @arbz/execute
```

## Usage

Import the `execute` function and run shell commands with a promise-based API:

```typescript
import { execute } from '@arbz/execute';

const run = async () => {
  const gitLog = await execute('git log', {
    disableStdOut: true, // Suppress standard output
  });
  console.log(gitLog); // Handle the command output
};

run();
```

### Options

The `execute` function accepts a second parameter for configuration:

| Option          | Type    | Default | Description                          |
| --------------- | ------- | ------- | ------------------------------------ |
| `disableStdOut` | boolean | `false` | If `true`, suppresses stdout output. |

## Features

- **Promise-based API** for cleaner asynchronous code.
- Suppress `stdout` easily using the `disableStdOut` option.

## License

This project is licensed under the [MIT License](LICENSE).

