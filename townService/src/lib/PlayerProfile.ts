import { ChatMessage, PlayerProfile as PlayerProfileModel } from '../types/CoveyTownSocket';

const DEFAULT_AVATAR = 'DefaultAvatar.png';

export default class PlayerProfile {
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

  /** A list of usernames of players that are friends with this player */
  private _friendsList: string[] = [];

  public get friendsList() {
    return this._friendsList;
  }

  public set friendsList(newList: string[]) {
    this._friendsList = newList;
  }

  /** A list of the messages received by this player's friends */
  private _inbox: ChatMessage[] = [];

  public get inbox() {
    return this._inbox;
  }

  public set inbox(newList: ChatMessage[]) {
    this._inbox = newList;
  }

  constructor(userName: string, password: string) {
    this._username = userName;
    this._password = password;
  }

  /** Adds the given friend to this player's friend list if they are not already there and if the
   * given player is not this player. If the given player profile is already in the friend list or
   * if the given player profile is this player, nothing happens.
   */
  public addFriend(friend: PlayerProfile): void {
    const alreadyFriend = this.friendsList.find(name => name === friend.username);
    const isThisPlayer = this.username === friend.username;
    if (!alreadyFriend && !isThisPlayer) {
      this._friendsList.push(friend.username);
    }
  }

  /** Removes the given friend from this player's friend list if it is in the list. If the given player
   * is not in the friend list, nothing happens.
   */
  public removeFriend(friend: PlayerProfile): void {
    this.friendsList = this.friendsList.filter(name => name !== friend.username);
  }

  /** Adds the given message to this player's inbox. */
  public receiveMessage(message: ChatMessage) {
    this._inbox.push(message);
  }

  public toProfileModel(): PlayerProfileModel {
    return {
      avatar: this._avatar,
      aboutMe: this._aboutMe,
      friendsList: this._friendsList,
      inbox: this._inbox,
    };
  }
}
