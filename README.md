# nodejs-app-template

This is a template for a Node.js TypeScript app.

The following tools and conventions have been configured:

- "[Conventional Commits](https://www.conventionalcommits.org/)" for commit messages;
- "[Dev Containers](https://containers.dev/)" for development Docker containers;
- "[Docker](https://www.docker.com/)" for containerization;
- "[ESLint](https://www.npmjs.com/package/eslint)" for linting;
  - "[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)" for linting import/export;
  - "[eslint-plugin-sort-destructure-keys"](https://www.npmjs.com/package/eslint-plugin-sort-destructure-keys)" for sorting destructuring keys;
  - "[eslint-plugin-svelte](https://www.npmjs.com/package/eslint-plugin-svelte)" for linting Svelte;
  - "[typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)" for linting TypeScript;
- "[GitHub Actions](https://docs.github.com/en/actions)" for CI/CD;
- "[Hadolint](https://github.com/hadolint/hadolint)" for linting Dockerfiles;
- "[npm](https://www.npmjs.com/)" for package management and Node.js scripts;
- "[Prettier](https://www.npmjs.com/package/prettier)" for code formatting;
  - "[prettier-plugin-svelte](https://www.npmjs.com/package/prettier-plugin-svelte)" for formatting Svelte;
- "[release-it](https://www.npmjs.com/package/release-it)" for releasing;
  - "[@release-it/conventional-changelog](https://www.npmjs.com/package/@release-it/conventional-changelog)" for generating changelogs automatically;
- "[Testcontainers](https://www.npmjs.com/package/testcontainers)" for testing with Docker containers;
- "[tsx](https://www.npmjs.com/package/tsx)" for running TypeScript code;
- "[TypeScript](https://www.npmjs.com/package/typescript)" for TypeScript support;

## Usage

### Install dependencies

```bash
npm ci
```

### Edit the code

You can edit the code in the "`src`" directory.
The entry point of the application is "`src/main.ts`".

### Run the application in development mode

```bash
npm run dev
```

Note: The project uses "[tsx](https://www.npmjs.com/package/tsx)" to run TypeScript code on the fly.

### Compile the application

```bash
npm run compile
```

This will create a "`dist`" directory with the compiled code.

Note: The "`dist`" directory will mimic the main directory structure. All directories with TypeScript files will be recreated in the "`dist`" directory. In the default configuration those are "`src`" and "`test`".

### Run the compiled application

```bash
node ./dist/main.js
```

Note: This will command will fail if the application has not been compiled (no "`dist`" directory)!

### Test the application

Native [Node.js](https://nodejs.org/) test runner is used to run the tests.
Native "node:assert" and "node:test" modules are used to write the tests.

Source code-related tests are kept alongside the source code they test in the "`src`" directory. Other tests and test utilities are kept in the "`test`" directory.

To run the unit tests:

```bash
npm run test
```

The coverage report can be generated in the "lcov" format by running:

```bash
npm run test:experimental-coverage
```

After running the command, the coverage report will be available in the "`lcov.info`" file.

Note that the coverage report is experimental as it only works on compiled code.

### Run the linter

"[ESLint](https://www.npmjs.com/package/eslint)" is used to lint the code.

```bash
npm run eslint:check
```

Note: The linter will return a non-zero exit code if there are any linting errors or warnings.

You can also try to automatically fix some of the errors and warnings by running:

```bash
npm run eslint:fix
```

### Run the formatter

"[Prettier](https://www.npmjs.com/package/prettier)" is used to format the code.

```bash
npm run prettier:check
```

Formatting errors can be automatically fixed by running:

```bash
npm run prettier:fix
```

### Commit the changes

"[Conventional Commits](https://www.conventionalcommits.org/)" are used to format the commit messages.

The following types are supported:

- "`feat`": A new feature;
- "`fix`": A bug fix;
- "`chore`": Other changes;

Use `{type}!: {description}` as the commit message for breaking changes.

Thanks to the "[@release-it/conventional-changelog](https://www.npmjs.com/package/@release-it/conventional-changelog)" plugin for "[release-it](https://www.npmjs.com/package/release-it)", the changelog will be automatically generated when releasing. Also, the version number will be automatically incremented based on the commit messages.

## GitHub Actions

### Continuous integration

There is one CI pipeline configured in the "`.github/workflows`" directory:

- "[Continuous integration](.github/workflows/continuous_integration.yaml)": This pipeline will check the integrity of the code by running formatting, linting, and testing.

### Continuous delivery

There is one CD pipeline configured in the "`.github/workflows`" directory:

- "[Release](.github/workflows/release.yaml)": This pipeline will create a GitHub release, build a Docker image, and push it to a Docker registry and also push the compiled code to npm.
