# {{pkgName}}

[![Docs](https://img.shields.io/badge/Docs-read-%23fdf9f5)](https://{{author}}.github.io/{{repoName}})
[![Build Status](https://github.com/{{author}}/{{repoName}}/actions/workflows/build.yml/badge.svg)](https://github.com/{{author}}/{{repoName}}/actions/workflows/build.yml)
[![npm-version](https://img.shields.io/npm/v/{{pkgName}}.svg)](https://www.npmjs.com/package/{{pkgName}})
[![Coverage Status](https://img.shields.io/coverallsCoverage/github/{{author}}/{{repoName}})](https://coveralls.io/github/{{author}}/{{repoName}})
[![minified-size](https://img.shields.io/bundlephobia/minzip/{{pkgName}})](https://bundlephobia.com/package/{{pkgName}})

{{description}}

## Install

```
npm add {{pkgName}}
```

## Publish New Version

You can use [npm version](https://docs.npmjs.com/cli/v10/commands/npm-version) to bump version.

```
npm version patch
```

Push the tag to remote and CI will publish the new version to npm.

```
git push --follow-tags
```
