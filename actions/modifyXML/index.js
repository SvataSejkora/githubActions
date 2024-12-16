const core = require('@actions/core');
const fs = require('fs');
const parser = require('xml2js');

try {
    const nodeToFind = core.getInput('nodeToDelete');
    const filePath = core.getInput('permissionSetFilePath');
    console.log('XML node to delete and target file:', nodeToFind, filePath);

    const indexOfNode = [];
    const rawData = fs.readFileSync(filePath);
    parser.parseString(rawData, (err, result) => {
        result.PermissionSet.userPermissions.forEach((item, index) => {
            if (nodeToFind.includes(item.name[0])) {
                indexOfNode.push(index);
            }
        });
        for (let i = indexOfNode.length - 1; i >= 0; i--) {
            result.PermissionSet.userPermissions.splice(indexOfNode[i], 1);
        }

        const builder = new parser.Builder();
        const xml = builder.buildObject(result);
        fs.writeFileSync(filePath, xml);
    });
} catch (e) {
    core.setFailed(e.message);
}



