# GitHub Actions

This repository serves as a container of actions to be used by other GitHub repositories with workflows. The reason is having all required `node_modules` installed here (stored on remote as well). This approach makes workflow-like repositories smaller and reduces their dependencies.

### How To Use
In your workflow yaml script, follow the example below.
Regarding the `@{ref}` part, see docs [here](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#calling-a-reusable-workflow).
```
jobs:
  my-job:
    steps:
      - name: step name
        id: step id
        uses: SvataSejkora/githubActions/actions/parseJSON@t1
        with:
          branch: ${{ github.ref_name }}
          myInput: 'my input value' 
```
