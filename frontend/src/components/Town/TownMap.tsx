import axios from 'axios';
import Phaser from 'phaser';
import React, { useCallback, useEffect } from 'react';
import { DirectMessage } from '../../../../shared/types/CoveyTownSocket';
import PlayerController from '../../classes/PlayerController';
import useTownController from '../../hooks/useTownController';
import SocialSidebar from '../SocialSidebar/SocialSidebar';
import NewConversationModal from './interactables/NewCoversationModal';
import ProfileModal from './interactables/ProfileModal';
import SelfProfileModal from './interactables/SelfProfileModal';
import TownGameScene from './TownGameScene';

export default function TownMap(): JSX.Element {
  const coveyTownController = useTownController();
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPlayer, setOpenPlayer] = React.useState<PlayerController>();
  const [isSelf, setIsSelf] = React.useState(false);
  const handleClose = () => setOpenProfile(false);
  const updateData = useCallback(
    (newAvatar: string | undefined, newAboutMe: string, friendsList: string[]) => {
      coveyTownController.emitPlayerUpdate({
        avatar: newAvatar == undefined ? '' : newAvatar,
        aboutMe: newAboutMe,
        friendsList: friendsList,
      });
    },
    [coveyTownController],
  );

  const getDBProfile = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_TOWNS_SERVICE_URL}/profiles/` +
          coveyTownController.ourPlayer.userName,
      )
      .then(res => {
        updateData(res.data.avatar, res.data.aboutMe, res.data.friendsList);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDBProfile();
  });

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      backgroundColor: '#000000',
      parent: 'map-container',
      render: { pixelArt: true, powerPreference: 'high-performance' },
      scale: {
        expandParent: false,
        mode: Phaser.Scale.ScaleModes.WIDTH_CONTROLS_HEIGHT,
        autoRound: true,
      },
      width: 800,
      height: 600,
      fps: { target: 30 },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }, // Top down game, so no gravity
        },
      },
    };
    console.log('CTC changed');

    const game = new Phaser.Game(config);
    const newGameScene = new TownGameScene(
      coveyTownController,
      setOpenProfile,
      setOpenPlayer,
      setIsSelf,
    );
    game.scene.add('coveyBoard', newGameScene, true);
    const pauseListener = newGameScene.pause.bind(newGameScene);
    const unPauseListener = newGameScene.resume.bind(newGameScene);
    coveyTownController.addListener('pause', pauseListener);
    coveyTownController.addListener('unPause', unPauseListener);

    const receiveMessage = ({ message, toPlayer }: DirectMessage) => {
      const userName = coveyTownController.ourPlayer.userName;
      if (userName === toPlayer) {
        coveyTownController.ourPlayer.receiveMessage(message);
      }
      console.log('receive', message.body);
    };
    coveyTownController.addListener('directMessage', receiveMessage);

    return () => {
      coveyTownController.removeListener('pause', pauseListener);
      coveyTownController.removeListener('unPause', unPauseListener);
      coveyTownController.removeListener('directMessage', receiveMessage);
      game.destroy(true);
    };
  }, [coveyTownController]);

  return isSelf ? (
    <div id='app-container'>
      <NewConversationModal />
      <SelfProfileModal
        open={openProfile}
        openPlayer={openPlayer}
        handleClick={handleClose}
        updateData={updateData}
      />
      <div id='map-container' />
      <SocialSidebar />
    </div>
  ) : (
    <div id='app-container'>
      <NewConversationModal />
      <ProfileModal
        open={openProfile}
        openPlayer={openPlayer}
        handleClick={handleClose}
        updateData={updateData}
        self={coveyTownController.ourPlayer}
      />
      <div id='map-container' />
      <SocialSidebar />
    </div>
  );
}
