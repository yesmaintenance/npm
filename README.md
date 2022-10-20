# [nikolarhristov] maintenance scripts

[![npm](https://img.shields.io/npm/v/@nikolarhristov/maintenance?color=black&label=%20&logo=npm&logoColor=white)][@nikolarhristov/maintenance]
[![Dependabot](https://img.shields.io/github/workflow/status/nikolaxhristov/maintenance/Dependabot?color=black&label=%20&logo=dependabot&logoColor=white)][@nikolarhristov/maintenance]
[![Node](https://img.shields.io/github/workflow/status/nikolaxhristov/maintenance/Node?color=black&label=%20&logo=node.js&logoColor=white)][node.yml]

**.env**

```env
GITHUB_USER=your_github_username
BASE_DIR="your_development_folder"
GITHUB_AUTH_TOKEN="your_github_authentication_token"
```

## Installation

```sh
# Using NPM
npm install -g @nikolarhristov/maintenance
# Using Yarn
yarn global add @nikolarhristov/maintenance
# Using PNPM
pnpm install -g @nikolarhristov/maintenance
```

or direct usage:

```sh
# Using NPM
npx @nikolarhristov/maintenance
# Using Yarn
yarn @nikolarhristov/maintenance
# Using PNPM
pnpx @nikolarhristov/maintenance
```

## Then simply run each of the commands:

Delete all GitHub Actions runs and their logs for all of your repositories:

```sh
maintenance clean
```

Create a `dependabot.yml` file in each of the .github directories for each of
the packages in the monorepo:

```sh
maintenance dependabot
```

Dispatch all workflows for all repositories for a given user:

```sh
maintenance dispatch

# or specific repositories by name
maintenance dispatch repository-name repository-name-2
```

Enable all the features that GitHub offers for all the repositories that you
have access to:

```sh
maintenance edit-features
```

Create a `node.yml` file in the `.github/workflows` directory for each
repository that has a `package.json` file.

```sh
maintenance node
```

Create a `rust.yml` file in the `.github/workflows` directory for each
repository that has a `Cargo.toml` file.

```sh
maintenance rust
```

Run all workflow tasks.

```sh
maintenance workflows
```

Squash all commits that contain `Cleanup`.

```sh
maintenance squash
```

Find all the `package.json` files in the project, and then star all the
dependencies in that `package.json`.

```sh
maintenance star
```

[nikolarhristov]: https://github.com/nikolaxhristov
[@nikolarhristov/maintenance]: https://npmjs.org/@nikolarhristov/maintenance
[node.yml]:
	https://github.com/nikolaxhristov/maintenance/actions/workflows/node.yml

[![Lightrix logo](https://raw.githubusercontent.com/Lightrix/npm/main/.github/img/favicon.png "Built with Lightrix/npm")](https://github.com/Lightrix/npm)
