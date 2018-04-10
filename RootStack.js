import CreateRoomPage from './rooms/components/RoomsCreateRoom.js';
import RoomsDetail from './rooms/components/RoomsDetail.js';
import LoginPage from './sessions/components/SignIn.js';
import MainMenuPage from './routes/MainMenu/MainMenu.js';
import JoinRoomPage from './routes/MainMenu/JoinRoom.js';

import { StackNavigator } from "react-navigation";


export const RootStack = StackNavigator(
  {
    Login: { screen: LoginPage },
    MainMenu: { screen: MainMenuPage },
    JoinRoom: { screen: JoinRoomPage },
    CreateRoom: { screen: CreateRoomPage },
    RoomsDetail: { screen: RoomsDetail},
  },
  {
    initialRouteName: "Login",
  }
);

