import { Client } from '../../../../sdk/types/client';
import { GlobalState } from '../../../../util/global-state';
import { refreshProjects } from '../../projects/commands/refresh-projects';

export async function selectClient(client: Client): Promise<void> {
	const selectedClient = GlobalState.get('selectedClient') as Client | undefined;

	// skip if current client is already selected
	if (selectedClient && selectedClient.id === client.id) {
		return;
	}

	if (client) {
		GlobalState.set('selectedClient', client);
		GlobalState.set('selectedProject', null);

		//TODO refresh tree views
		refreshProjects();
	}
}
