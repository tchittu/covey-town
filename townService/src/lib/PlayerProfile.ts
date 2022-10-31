import Player from "./Player";

export default class PlayerProfile {
  private readonly _id: string = ''; // this should probably match the id in the Player class?

  public get id() {
    return this._id;
  }

  private _player: Player;

  public get player() {
    return this._player;
  }

  public set player(newPlayer: Player) {
    this._player = newPlayer;
  }

  private _username: string;

  public get username() {
    return this._username;
  }

  public set username(newUsername: string) {
    this._username = newUsername;
  }

  private _password: string;

  public get password() {
    return this._password;
  }

  public set password(newPassword: string) {
    this._password = newPassword;
  }

  private _avatar = ''; // set to some default image

  public get avatar() {
    return this._avatar;
  }

  public set avatar(newAvatar: string) {
    this._avatar = newAvatar;
  }

  private _aboutMe = '';

  public get aboutMe() {
    return this._aboutMe;
  }

  public set aboutMe(newAboutMe: string) {
    this._aboutMe = newAboutMe;
  }

  private _friendsList: PlayerProfile[] = [];

  public get friendsList() {
    return this._friendsList;
  }

  public set friendsList(newList: PlayerProfile[]) {
    this._friendsList = newList;
  }

  constructor(player: Player, password: string) {
    this._player = player;
    this._username = player.userName;
    this._password = password;
  }

  public addFriend(friend: PlayerProfile) {
    this._friendsList.push(friend);
  }

  public removeFriend(friend: PlayerProfile) {
    this._friendsList.filter(player => player.id !== friend.id);
  }
}
