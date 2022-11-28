import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import {
  ChatMessage,
  Player as PlayerModel,
  PlayerLocation,
  PlayerProfile,
} from '../types/CoveyTownSocket';

export type PlayerEvents = {
  movement: (newLocation: PlayerLocation) => void;
};

export type PlayerGameObjects = {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  label: Phaser.GameObjects.Text;
  locationManagedByGameScene: boolean /* For the local player, the game scene will calculate the current location, and we should NOT apply updates when we receive events */;
};
export default class PlayerController extends (EventEmitter as new () => TypedEmitter<PlayerEvents>) {
  private _location: PlayerLocation;

  private _profile: PlayerProfile;

  private readonly _id: string;

  private readonly _userName: string;

  public gameObjects?: PlayerGameObjects;

  private _inbox: ChatMessage[] = [];

  get inbox() {
    return this._inbox;
  }

  set inbox(newList: ChatMessage[]) {
    this._inbox = newList;
  }

  constructor(
    id: string,
    userName: string,
    location: PlayerLocation,
    profile: PlayerProfile = { avatar: 'default', aboutMe: 'default', friendsList: [] },
  ) {
    super();
    this._id = id;
    this._userName = userName;
    this._location = location;
    this._profile = profile;
  }

  set location(newLocation: PlayerLocation) {
    this._location = newLocation;
    this._updateGameComponentLocation();
    this.emit('movement', newLocation);
  }

  get location(): PlayerLocation {
    return this._location;
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  get profile(): PlayerProfile {
    return this._profile;
  }

  set profile(profile: PlayerProfile) {
    this._profile = profile;
  }

  toPlayerModel(): PlayerModel {
    return { id: this.id, userName: this.userName, location: this.location, profile: this.profile };
  }

  private _updateGameComponentLocation() {
    if (this.gameObjects && !this.gameObjects.locationManagedByGameScene) {
      const { sprite, label } = this.gameObjects;
      if (!sprite.anims) return;
      sprite.setX(this.location.x);
      sprite.setY(this.location.y);
      label.setX(sprite.body.position.x);
      label.setY(sprite.body.position.y - 20);
      if (this.location.moving) {
        sprite.anims.play(`misa-${this.location.rotation}-walk`, true);
      } else {
        sprite.anims.stop();
        sprite.setTexture('atlas', `misa-${this.location.rotation}`);
      }
    }
  }

  static fromPlayerModel(modelPlayer: PlayerModel): PlayerController {
    return new PlayerController(
      modelPlayer.id,
      modelPlayer.userName,
      modelPlayer.location,
      modelPlayer.profile,
    );
  }

  /**
   * Adds the incoming message to this player's inbox
   * @param message
   */
  public receiveMessage(message: ChatMessage): void {
    this._inbox.push(message);
    //console.log('player receive', message.body);
  }

  public clearInbox(): void {
    this._inbox = [];
  }
}
