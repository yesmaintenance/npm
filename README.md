# [nikolarhristov] maintenance scripts

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

```bash
maintenance clean
```

Create a dependabot.yml file in each of the .github directories for each of the
packages in the monorepo:

```bash
maintenance dependabot
```

Enable all the features that GitHub offers for all the repositories that you
have access to:

```bash
maintenance edit-features
```

Create a `node.yml` file in the `.github/workflows` directory for each
repository that has a `package.json` file

```bash
maintenance node
```

Squash all the commits that have a message containing `Cleanup`

```bash
maintenance squash
```

Find all the `package.json` files in the project, and then stars all the
dependencies in those `package.json` files

```bash
maintenance star
```

[nikolarhristov]: https://github.com/nikolaxhristov
