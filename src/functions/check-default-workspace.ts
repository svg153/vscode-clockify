import { Dialogs } from '../util/dialogs';
import { Config } from './../util/config';
import { Clockify } from '../sdk';

export async function checkDefaultWorkspace(): Promise<boolean> {
  const apiKey = Config.get<string>('apiKey');
  if (!apiKey) {
    const enteredApiKey = await Dialogs.askForApiKey();
    if (!enteredApiKey) {
      return false;
    }
    Config.set('apiKey', enteredApiKey, true);
    Clockify.authenticate(enteredApiKey);
  }

  const workspaceId = Config.get<string>('defaultWorkspaceId');
  if (!workspaceId) {
    const workspace = await Dialogs.selectWorkspace('Select the default workspace.');
    if (!workspace) {
      return false;
    } else {
      Config.set('defaultWorkspaceId', workspace.id, true);
    }
  }

  return true;
}
