const core = require('@actions/core');
const fs = require('fs');

try {
    const branch = core.getInput('branch');
    const configFilePath = core.getInput('repositoryConfigPath');
    console.log('Using the following branch and config file:', branch, configFilePath);

    const rawData = fs.readFileSync(configFilePath);
    const data = JSON.parse(rawData);
    const branchData = data[branch];

    let certificatePath;
    switch (branch) {
        case 'develop':
            certificatePath = '${HOME}/qa.key';
            break;
        case 'staging':
            certificatePath = '${HOME}/staging.key';
            break;
        case 'main':
            certificatePath = '${HOME}/prod.key';
            break;
        case 'fsl':
            certificatePath = '${HOME}/fsl.key';
            break;
        default:
            certificatePath = '${HOME}/qa.key';
    }

    core.setOutput('userName', branchData.userName);
    core.setOutput('clientId', branchData.clientId);
    core.setOutput('instanceUrl', branchData.instanceUrl);
    core.setOutput('certificatePath', certificatePath);
    core.setOutput('runDestructive', branchData.runDestructive);
} catch (e) {
    core.setFailed(e.message);
}



