import { nanoid } from 'nanoid';
import PlayerController from '../../../classes/PlayerController';
import { PlayerProfile } from '../../../types/CoveyTownSocket';

export default function TwoPlayerChat(
  sender: PlayerController,
  receiver: PlayerController,
  body: string,
) {
  receiver.receiveMessage({
    author: sender.userName,
    sid: nanoid(),
    body: body,
    dateCreated: new Date(),
  });
}

export function inboxToText(profile: PlayerProfile | undefined) {
  let res: string = '';
  if (profile && profile.inbox) {
    profile.inbox.push({author: 'player 1', sid: nanoid(), body: 'hello!', dateCreated: new Date()});
    profile.inbox.push({author: 'player 2', sid: nanoid(), body: 'goodbye', dateCreated: new Date()});
    profile.inbox.forEach(message => {
      res = res + message.dateCreated.toDateString() + ', From ' + message.author + ': ' + message.body + '\n\n';
    });
  }
  return res;
}
