import gql from 'graphql-tag';


export const ChatMessageListQuery = gql`
  query chatMsgByRoomId($id: Int!) {
    chatMsgByRoomId(id: $id) {
      message,
      sender
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
