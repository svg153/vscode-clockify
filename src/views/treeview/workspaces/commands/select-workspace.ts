import { Workspace } from '../../../../sdk/types/workspace';
import { GlobalState } from '../../../../util/global-state';
import { refreshClients } from '../../clients/commands/refresh-clients';
import { refreshProjects } from '../../projects/commands/refresh-projects';
import { refreshWorkspaces } from './refresh-workspaces';

export async function selectWorkspace(workspace: Workspace): Promise<void> {
	const selectedWorkspace = GlobalState.get<Workspace>('selectedWorkspace');

	// skip if workspace is already selected
	if (selectedWorkspace && selectedWorkspace.id === workspace.id) {
		return;
	}

	if (workspace) {
		GlobalState.set('selectedWorkspace', workspace);
		GlobalState.set('selectedClient', null);
		GlobalState.set('selectedProject', null);

		//TODO refresh tree views
		refreshWorkspaces();
		refreshClients();
		refreshProjects();
	}
}