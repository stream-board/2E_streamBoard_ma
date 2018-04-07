import gql from 'graphql-tag';


export const CHAT_MESSAGE_LIST_QUERY = gql`
  query chatMsgByRoomId($id: Int!) {
    chatMsgByRoomId(id: $id) {
      id,
      message,
      user_id
    }
}
`;

export const ChatRoomCreateMutation = gql`
  mutation createChatRoom($chatRoom: ChatRoomInput! ) {
    createChatRoom(chatRoom: $chatRoom) {
      id
    }
  }
`;
