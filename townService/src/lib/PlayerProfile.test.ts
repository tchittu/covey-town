import { mock, mockClear } from 'jest-mock-extended';
import { TownEmitter } from '../types/CoveyTownSocket';
import Player from './Player';
import PlayerProfile from './PlayerProfile';

describe('PlayerProfile', () => {
  const username = 'username';
  const townEmitter = mock<TownEmitter>();
  const password = 'password';
  let player: Player;
  let profile: PlayerProfile;
  beforeEach(() => {
    mockClear(townEmitter);
    player = new Player(username, townEmitter);
    profile = new PlayerProfile(player, password);
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
    it('is initially set to default avatar', () => {});
    it('returns correct avatar url', () => {});
    it('sets to given avatar url', () => {});
  });
  describe('aboutMe property', () => {
    it('is initually an empty string', () => {});
    it('returns correct aboutMe', () => {});
    it('sets to given aboutMe', () => {});
  });
  describe('friendsList property', () => {
    it('is initially an empty list', () => {});
    it('returns correct friendsList', () => {});
    it('sets to given friendsList', () => {});
  });
  describe('addFriend', () => {
    it('adds the player friend if they are not already in the friendsList', () => {});
    it('does nothing if the given player is already in the friendsList', () => {});
    it('does nothing if the given player is this player', () => {});
  });
  describe('removeFriend', () => {
    it('removes the given player if that player is in the friends list', () => {});
    it('does nothing if the given player is not in the friends list', () => {});
  });
});
