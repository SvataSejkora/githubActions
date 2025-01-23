const core = require('@actions/core');
const github = require('@actions/github');

// inspired by https://github.com/simondotm/last-successful-commit-action
try {
    const octokit = github.getOctokit(core.getInput('githubToken'));
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    const params = {
        owner,
        repo,
        workflow_id: core.getInput('workflowId'),
        status: 'success'
    }
    // based on event, value might be tag name as well
    const branch = core.getInput('branch');
    if (branch) {
        params.branch = branch;
    }
    // optionally filter workflow runs by the event that triggered them
    // unlike v1, there is no longer a default event of 'push', the default event type is 'any'
    const event = core.getInput('workflowEvent');
    if (event) {
        params.event = event;
    }
    octokit.rest.actions
        .listWorkflowRuns(params)
        .then((res) => {
            console.log('test test')
            const lastSuccessCommitHash =
                res.data.workflow_runs.length > 0
                    ? res.data.workflow_runs[0].head_commit.id
                    : '';
            core.setOutput('commitHash', lastSuccessCommitHash);
        })
        .catch((e) => {
            core.setFailed(e.message);
        });
} catch (e) {
    core.setFailed(e.message);
}
