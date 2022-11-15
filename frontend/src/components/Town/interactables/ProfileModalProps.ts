import PlayerController from '../../../classes/PlayerController';

export interface ProfileModalProps {
  open: boolean;
  openPlayer: PlayerController | undefined;
  handleClick: () => void;
}
