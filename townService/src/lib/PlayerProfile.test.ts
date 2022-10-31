import { TownEmitter } from "../types/CoveyTownSocket";
import Player from "./Player";
import PlayerProfile from "./PlayerProfile";
import { mock } from 'jest-mock-extended';

describe('PlayerProfile', () => {
  beforeEach(() => {
    const username = 'username';
    const townEmitter: TownEmitter = mock<TownEmitter>();
    const player = new Player(username, townEmitter);
    const profile = new PlayerProfile(player, 'password');
  })
  describe('username property', () => {
    it('returns correct username', () => {});
    it('sets to given username', () => {});
  });
  describe('password property', () => {
    it('returns correct password', () => {});
    it('sets to given password', () => {});
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
