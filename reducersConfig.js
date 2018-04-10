import { combineReducers } from "redux";
import { chatMessageListReducer } from './chat/chatRedux';
import { roomCreateReducer } from "./rooms/roomsRedux";


export default combineReducers({
    roomCreateParams: roomCreateReducer,
    chatMessageList: chatMessageListReducer,
})