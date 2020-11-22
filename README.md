# allowed-branch-javascript-action
JavaScript action returns success for pull request allowed branch, failure otherwise. 

<hr />

[![GitHub license](https://img.shields.io/github/license/cdcavell/allowed-branch-javascript-action)](https://github.com/cdcavell/allowed-branch-javascript-action/blob/master/LICENSE)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/cdcavell/allowed-branch-javascript-action)
![GitHub top language](https://img.shields.io/github/languages/top/cdcavell/allowed-branch-javascript-action)
![GitHub language count](https://img.shields.io/github/languages/count/cdcavell/allowed-branch-javascript-action)
[![.github/workflows/develop-main.yml](https://github.com/cdcavell/allowed-branch-javascript-action/workflows/.github/workflows/develop-main.yml/badge.svg)](https://github.com/cdcavell/allowed-branch-javascript-action/actions?query=workflow%3A.github%2Fworkflows%2Fmaster-main.yml)

<hr />

## Usage

Create a new `.github/workflows/allowbranch.yml` file:

```yaml
on:
  pull_request:
    branches:
      - master

jobs:
  allowed_branch_job:
    runs-on: ubuntu-latest
    name: Allowed Branch
    steps:
    # To use this repository's private action,
    # you must check out the repository
    - name: Checkout
    uses: actions/checkout@v2
    - name: Validate action step
      id: allowed-branch
      uses: cdcavell/allowed-branch-javascript-action@v1.1
      with:
        allowed-branch: 'develop'
```

Set Branch protection rules:

![status checks](StatusChecks.jpg?raw=true)

## Note

`allowed-branch` is a delimited string containting allowed branches. String is comma delimited.
Wildcard `*` is allowed, for example:

`feature/*` will evaluate true for:
- feature/v1
- feature/v1.1
- feature/v1.0.1

`*v1` will evaluate true for:
- feature/v1
- hotfix/v1
- release/v1

