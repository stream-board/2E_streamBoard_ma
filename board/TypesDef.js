import gql from 'graphql-tag';


export const BoardCreateRoomMutation = gql`
  mutation createBoardRoom($room: BoardRoomInput!) {
    createBoardRoom(room: $room) {
      id
    }
  }
`;
