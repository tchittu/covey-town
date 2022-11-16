import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import PlayerController from '../../../classes/PlayerController';
import useTownController from '../../../hooks/useTownController';

interface ProfileModalProps {
  open: boolean;
  openPlayer: PlayerController | undefined;
  handleClick: () => void;
}

export default function ProfileModal(props: ProfileModalProps): JSX.Element {
  const coveyTownController = useTownController();

  useEffect(() => {
    if (props.open) {
      coveyTownController.pause();
    } else {
      coveyTownController.unPause();
    }
  }, [coveyTownController, props.open]);

  const closeModal = useCallback(() => {
    coveyTownController.unPause();
    props.handleClick();
  }, [coveyTownController, props.handleClick]);
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={props.open}
      onClose={() => {
        closeModal();
        coveyTownController.unPause();
      }}
      useInert={true}>
      <ModalOverlay />
      <ModalContent maxW={'400px'}>
        <ModalCloseButton autoFocus={false} />
        <Center>
          <Box
            maxW={'400px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}>
            <Avatar
              size={'xl'}
              src={props.openPlayer?.profile.avatar}
              mb={4}
              pos={'relative'}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              {props.openPlayer?.userName}
            </Heading>
            <Text
              textAlign={'center'}
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
              mt={6}>
              {props.openPlayer?.profile.aboutMe}
            </Text>
            <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
              <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
                #art
              </Badge>
              <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
                #photography
              </Badge>
              <Badge px={2} py={1} bg={useColorModeValue('gray.50', 'gray.800')} fontWeight={'400'}>
                #music
              </Badge>
            </Stack>

            <Stack mt={8} direction={'row'} spacing={4}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                _focus={{
                  bg: 'gray.200',
                }}>
                Message
              </Button>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}>
                Add Friend
              </Button>
            </Stack>
          </Box>
        </Center>
      </ModalContent>
    </Modal>
  );
}
