

export class PlayerProfile {

    private _id: string = "";

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

    private _avatar: string = ""; //set to some default image

    public get avatar() {
        return this._avatar;
    }

    public set avatar(newAvatar: string) {
        this._avatar = newAvatar;
    }

    private _aboutMe: string = "";

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

    constructor(username: string, password: string) {
        this._username = username;
        this._password = password;
    }

    public addFriend(friend: PlayerProfile) {
        this._friendsList.push(friend);
    }

    public removeFriend(friend: PlayerProfile) {
        this._friendsList.filter(player => player.username !== friend.username);
    }
}
