import { nanoid } from 'nanoid';
import PlayerController from '../../../classes/PlayerController';

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
