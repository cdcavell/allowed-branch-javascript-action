const core = require('@actions/core');
const github = require('@actions/github');

try {

    // 'allowed-branch' input defined in action metadata file
    const allowedBranchArray = core.getInput('allowed-branch').trim().split(",");
    const pullRequestHeadRef = github.context.payload.pull_request.head.ref;
    console.log(`allowed-branch: [${allowedBranchArray.toString()}]`);
    console.log(`pull_request.head.ref: ${pullRequestHeadRef}`);

    var isValid = false;

    if (typeof pullRequestHeadRef === 'undefined') {
        core.setFailed('pull_request.head.ref not defined');
    } else if (pullRequestHeadRef === null) {
        core.setFailed('pull_request.head.ref not defined');
    } else {

        allowedBranchArray.forEach(function (item, index) {

            var comparer = item.trim();
            var branch = pullRequestHeadRef.trim();
            if (comparer.startsWith("*")) {
                if (branch.endsWith(comparer.replace(/\*/g, ""))) {
                    isValid = true;
                    console.log(`evaluate ${branch} ends with ${comparer} : passed`);
                } else {
                    console.log(`evaluate ${branch} ends with ${comparer} : failed`);
                }
            } else if (comparer.endsWith("*")) {
                if (branch.startsWith(comparer.replace(/\*/g, ""))) {
                    isValid = true;
                    console.log(`evaluate ${branch} starts with ${comparer} : passed`);
                } else {
                    console.log(`evaluate ${branch} starts with ${comparer} : failed`);
                }
            } else {
                if (branch.localeCompare(comparer) === 0) {
                    isValid = true;
                    console.log(`evaluate ${branch} equals ${comparer} : passed`);
                } else {
                    console.log(`evaluate ${branch} equals ${comparer} : failed`);
                }
            }
        });

    }

    if (isValid) {
        console.log(`branch ${pullRequestHeadRef} allowed`);
    } else {
        core.setFailed(`branch ${pullRequestHeadRef} not allowed`);
    }

} catch (error) {

    core.setFailed(error.message);

}
