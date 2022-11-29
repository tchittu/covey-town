import { mock, mockClear } from 'jest-mock-extended';
import { TownEmitter } from '../types/CoveyTownSocket';
import PlayerProfile from './PlayerProfile';

const DEFAULT_AVATAR = 'DefaultAvatar.png';

describe('PlayerProfile', () => {
  const username = 'username';
  const townEmitter = mock<TownEmitter>();
  const password = 'password';
  const friend1 = 'friend1';
  const friend2 = 'friend2';
  let profile: PlayerProfile;
  beforeEach(() => {
    mockClear(townEmitter);
    profile = new PlayerProfile(username, password);
  });
  describe('username property', () => {
    it('returns correct username', () => {
      expect(profile.username).toEqual(username);
    });
    it('sets to given username', () => {
      profile.username = 'newName';
      expect(profile.username).toEqual('newName');
    });
  });
  describe('password property', () => {
    it('returns correct password', () => {
      expect(profile.password).toEqual(password);
    });
    it('sets to given password', () => {
      profile.password = 'hello';
      expect(profile.password).toEqual('hello');
    });
  });
  describe('avatar property', () => {
    it('is initially set to default avatar', () => {
      expect(profile.avatar).toEqual(DEFAULT_AVATAR);
    });
    it('returns correct avatar url', () => {
      expect(profile.avatar).toEqual(DEFAULT_AVATAR);
      profile.avatar = 'newAvatar.png';
      expect(profile.avatar).toEqual('newAvatar.png');
    });
    it('sets to given avatar url', () => {
      expect(profile.avatar).toEqual(DEFAULT_AVATAR);
      profile.avatar = 'newAvatar.png';
      expect(profile.avatar).toEqual('newAvatar.png');
    });
  });
  describe('aboutMe property', () => {
    it('is initually an empty string', () => {
      expect(profile.aboutMe).toEqual('');
    });
    it('returns correct aboutMe', () => {
      profile.aboutMe = 'hello';
      expect(profile.aboutMe).toEqual('hello');
    });
    it('sets to given aboutMe', () => {
      profile.aboutMe = 'hello';
      expect(profile.aboutMe).toEqual('hello');
    });
  });
  describe('friendsList property', () => {
    it('is initially an empty list', () => {
      expect(profile.friendsList).toEqual([]);
      expect(profile.friendsList.length).toEqual(0);
    });
    it('returns correct friendsList', () => {
      profile.friendsList = [friend1];
      expect(profile.friendsList).toEqual([friend1]);
    });
    it('sets to given friendsList', () => {
      profile.friendsList = [friend1, friend2];
      expect(profile.friendsList).toEqual([friend1, friend2]);
      expect(profile.friendsList.length).toEqual(2);
    });
  });
  describe('addFriend', () => {
    it('adds the player friend if they are not already in the friendsList', () => {
      const friendProfile1 = new PlayerProfile('friendUserName1', 'friendPassword1');
      profile.addFriend(friendProfile1);
      expect(profile.friendsList).toEqual(['friendUserName1']);
    });
    it('does nothing if the given player is already in the friendsList', () => {
      const friendProfile1 = new PlayerProfile('friendUserName1', 'friendPassword1');
      profile.addFriend(friendProfile1);
      expect(profile.friendsList).toEqual(['friendUserName1']);
      expect(() => profile.addFriend(friendProfile1)).not.toThrowError();
      profile.addFriend(friendProfile1);
      expect(profile.friendsList).toEqual(['friendUserName1']);
    });
    it('does nothing if the given player is this player', () => {
      expect(() => profile.addFriend(profile)).not.toThrowError();
      profile.addFriend(profile);
      expect(profile.friendsList).toEqual([]);
    });
  });
  describe('removeFriend', () => {
    it('removes the given player if that player is in the friends list', () => {
      const friendProfile1 = new PlayerProfile('friendUserName1', 'friendPassword1');
      profile.addFriend(friendProfile1);
      expect(profile.friendsList).toEqual(['friendUserName1']);
      profile.removeFriend(friendProfile1);
      expect(profile.friendsList).toEqual([]);
    });
    it('does nothing if the given player is not in the friends list', () => {
      const friendProfile1 = new PlayerProfile('friendUserName1', 'friendPassword1');
      const friendProfile2 = new PlayerProfile('friendUserName2', 'friendPassword2');
      profile.addFriend(friendProfile2);
      expect(() => profile.removeFriend(friendProfile1)).not.toThrowError();
      profile.removeFriend(friendProfile1);
      expect(profile.friendsList).toEqual(['friendUserName2']);
    });
  });
});
