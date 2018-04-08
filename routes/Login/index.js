import React, { Component } from "react";
import LoginPage from "./Login.js";
import MainMenuPage from "../MainMenu/index.js";
import { StackNavigator } from "react-navigation";

export default (DrawNav = StackNavigator(
  {
    Login: { screen: LoginPage },
    MainMenu: { screen: MainMenuPage },
  },
  {
    initialRouteName: "Login"
  }
));
