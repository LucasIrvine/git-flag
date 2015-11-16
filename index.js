var shell = require('shelljs');
//hook file contents (most temp)
var gitFlagVar = "DEV_MODE";
var gitFlagValue = true;
var emptyFileStarter = `#!/bin/sh \n#git-flag variable = ${gitFlagVar} \n${gitFlagVar}=${gitFlagValue} \nif [ "$DEV_MODE" = "true" ]; then \n\techo "Error: you can not commit because ${gitFlagVar} = ${gitFlagValue}" \n\texit 1 \nfi`;

function findGit(hookType) {
	if(shell.test('-d', '.git')) {
		console.log('yo we in git!');
		shell.cd('.git/hooks');
		if(shell.test('-e', hookType)) {
			shell.cp(hookType, hookType + '.git-flag-copy');
		} else if(shell.test('-e', hookType + '.sample')) {
			shell.cp(hookType + '.sample', hookType);
			var str = shell.cat(hookType);
			shell.sed('-i', str, emptyFileStarter, hookType);
		} else {
			console.log(hookType + '.sample nor ' + hookType + ' exists here apparently');
		}
	} else {
		shell.cd('../');
		findGit(hookType);
	}
}
findGit('pre-commit');
