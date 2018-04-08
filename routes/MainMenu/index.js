import React, { Component } from "react";
import MainMenuPage from './MainMenu.js';
import JoinRoomPage from './JoinRoom.js'
import CreateRoomPage from '../../rooms/components/RoomsCreateRoom.js';

import { StackNavigator } from "react-navigation";

export default (DrawNav = StackNavigator(
  {
    MainMenu: { screen: MainMenuPage },
    CreateRoom: { screen: CreateRoomPage },
    JoinRoom: { screen: JoinRoomPage },
  },
  {
    initialRouteName: "MainMenu"
  }
));
