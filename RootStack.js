import SignInPage from './sessions/components/SignIn.js';
import LobbyPage from './routes/Lobby/Lobby.js';
import CreateRoomPage from './rooms/components/RoomsCreateRoom.js';
import RoomsDetail from './rooms/components/RoomsDetail.js';
import SignOutPage from './sessions/components/SignOut.js';
import MainMenuPage from './routes/Lobby/MainMenu.js';
import JoinRoomPage from './routes/Lobby/JoinRoom.js';

import { StackNavigator } from "react-navigation";


export const RootStack = StackNavigator(
  {
    SignIn: { screen: SignInPage },
    Lobby: { screen: LobbyPage },
    CreateRoom: { screen: CreateRoomPage },
    RoomsDetail: { screen: RoomsDetail},
    SignOut: { screen: SignOutPage},
  },
  {
    initialRouteName: "SignIn",
  },
   { header: {visible:false} },
);

