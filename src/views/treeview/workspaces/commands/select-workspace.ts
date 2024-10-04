import { TreeView } from '../..';
import { Workspace } from '../../../../sdk/types/workspace';
import { GlobalState } from '../../../../util/global-state';
import { checkDefaultWorkspace } from '../../../../functions/check-default-workspace';
import { checkApiKey } from '../../../../functions/check-api-key';

export async function selectWorkspace(workspace: Workspace): Promise<void> {
  // Ensure API key is set before fetching workspaces
  checkApiKey();

  const selectedWorkspace = GlobalState.get<Workspace>('selectedWorkspace');

  // skip if workspace is already selected
  if (selectedWorkspace && selectedWorkspace.id === workspace.id) {
    return;
  }

  if (workspace) {
    GlobalState.set('selectedWorkspace', workspace);
    GlobalState.set('selectedClient', null);
    GlobalState.set('selectedProject', null);

    await checkDefaultWorkspace();

    TreeView.refreshWorkspaces();
    TreeView.refreshClients();
    TreeView.refreshProjects();
    TreeView.refreshTasks();
    TreeView.refreshTags();
    TreeView.refreshTimeentries();
  }
}
