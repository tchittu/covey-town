import Player from './Player';
import { PlayerProfile as PlayerProfileModel } from '../types/CoveyTownSocket';

const DEFAULT_AVATAR = 'DefaultAvatar.png';

export default class PlayerProfile {
  /** The identifier for this player profile. When a player logs on, this id will be set to
   * match the id of the corresponding Player object */
  private readonly _id: string;

  public get id() {
    return this._id;
  }

  /** The Player object that represents this player profile when the user is logged on */
  private _player: Player;

  public get player() {
    return this._player;
  }

  public set player(newPlayer: Player) {
    this._player = newPlayer;
  }

  /** The username of the player which matches the username field of the corresponding Player object */
  private _username: string;

  public get username() {
    return this._username;
  }

  public set username(newUsername: string) {
    this._username = newUsername;
  }

  /** The password that a player needs to enter to log in to this profile */
  private _password: string;

  public get password() {
    return this._password;
  }

  public set password(newPassword: string) {
    this._password = newPassword;
  }

  /** The avatar that appears on this player's profile. It is initially set to a default image
   * but can be changed by the user.
   */
  private _avatar = DEFAULT_AVATAR;

  public get avatar() {
    return this._avatar;
  }

  public set avatar(newAvatar: string) {
    this._avatar = newAvatar;
  }

  /** Information about this player that will be displayed to other players */
  private _aboutMe = '';

  public get aboutMe() {
    return this._aboutMe;
  }

  public set aboutMe(newAboutMe: string) {
    this._aboutMe = newAboutMe;
  }

  /** A list of players that are friends with this player */
  private _friendsList: string[] = [];

  public get friendsList() {
    return this._friendsList;
  }

  public set friendsList(newList: string[]) {
    this._friendsList = newList;
  }

  constructor(player: Player, password: string) {
    this._id = player.id;
    this._player = player;
    this._username = player.userName;
    this._password = password;
  }

  /** Adds the given friend to this player's friend list if they are not already there and if the
   * given player is not this player. If the given player profile is already in the friend list or
   * if the given player profile is this player, nothing happens.
   */
  public addFriend(givenId: string): void {
    const alreadyFriend = this.friendsList.find(id => givenId === id);
    const isThisPlayer = this.id === givenId;
    if (!alreadyFriend && !isThisPlayer) {
      this._friendsList.push(givenId);
    }
  }

  /** Removes the given friend from this player's friend list if it is in the list. If the given player
   * is not in the friend list, nothing happens.
   */
  public removeFriend(givenId: string): void {
    this.friendsList = this.friendsList.filter(id => id !== givenId);
  }

  toProfileModel(): PlayerProfileModel {
    return {
      avatar: this._avatar,
      aboutMe: this._aboutMe,
      friendsList: this._friendsList,
    };
  }
}
