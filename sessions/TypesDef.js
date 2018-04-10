import gql from 'graphql-tag';

export const UserInformationQuery = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      data
    }
  }
`;

export const ValidateSessionQuery = gql`
  query validateSession($headersSession: Headers!) {
    validateSession(headersSession: $headersSession) {
      id,
      email,
      nickname,
      name,
      token,
      client,
      image
    }
  }
`;

export const SessionCreateMutation = gql`
  mutation createSession($session: SessionInput!) {
    createSession(session: $session) {
      id,
      email,
      nickname,
      name,
      token,
      client,
      image
    }
  }
`;

export const SessionDeleteMutation = gql`
  mutation deleteSession($headersSession: Headers! ) {
    deleteSession(headersSession: $headersSession){
      success
    }
  }
`;