import { nanoid } from 'nanoid';
import PlayerController from '../../../classes/PlayerController';
import { ChatMessage } from '../../../types/CoveyTownSocket';

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

export function inboxToText(inbox: ChatMessage[] | undefined): string {
  let res = '';
  if (!inbox) {
    return res;
  }
  inbox.forEach(message => {
    res = res + 'From ' + message.author + ': ' + message.body + '\n';
  });
  return res;
}
