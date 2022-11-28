import { ChatMessage } from '../../../types/CoveyTownSocket';

/**
 * Converts an inbox to a string
 * @param inbox
 * @returns
 */
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
