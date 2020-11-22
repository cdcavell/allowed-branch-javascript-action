# allowed-branch-javascript-action
JavaScript action returns success for pull request allowed branch, failure otherwise. 

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

