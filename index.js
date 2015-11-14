var shell = require('shelljs');
function findGit(hookType) {
	if(shell.test('-d', '.git')) {
		shell.cd('.git/hooks');
		if(shell.test('-e', hookType + '.sample')) {
			console.log(hookType + '.sample is there!');
		} else if(shell.test('-e', hookType)) {
			console.log(hookType + '.sample is there!');
		} else {
			console.log(hookType + '.sample nor ' + hookType + ' exists here apparently');
		}
	} else {
		console.log('nope, go up');
		shell.cd('../');
		findGit(hookType);
	}
}
findGit('pre-commit');
