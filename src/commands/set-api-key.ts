import { Clockify } from '../sdk';
import { Config } from '../util/config';
import { Context } from '../util/context';
import { Dialogs } from '../util/dialogs';
import { TreeView } from '../views/treeview';
import { checkDefaultWorkspace } from '../functions/check-default-workspace';

export async function setApiKey() {
	// ask user for the api key
	const apiKey = await Dialogs.askForApiKey();
	if (!apiKey) {
		Context.set('initialized', false);
		return;
	}

	// set API key in config
	Config.set('apiKey', apiKey, true);

	// authenticate the SDK
	Clockify.authenticate(apiKey);

	// ensure the default workspace is set
	await checkDefaultWorkspace();

	// refresh tree view providers
	TreeView.refresh();

	Context.set('initialized', true);
}
