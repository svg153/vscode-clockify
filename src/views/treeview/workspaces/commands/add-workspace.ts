import { window } from 'vscode';
import { Clockify } from '../../../../sdk';
import { refreshWorkspaces } from './refresh-workspaces';
import { selectWorkspace } from './select-workspace';

export async function addWorkspace(): Promise<void> {
	// get the name for the new workspace
	const name = await window.showInputBox({
		title: 'Enter a name for your workspace',
		placeHolder: 'Name of the workspace',
		ignoreFocusOut: true,
	});
	if (!name) {
		return;
	}

	// create new workspace
	const workspace = await Clockify.addWorkspace({ name });
	if (workspace) {
		selectWorkspace(workspace);
		refreshWorkspaces();
		window.showInformationMessage(`Workspace '${workspace.name}' added successfully.`);
	}
}
