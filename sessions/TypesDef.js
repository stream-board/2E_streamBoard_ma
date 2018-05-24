import gql from 'graphql-tag';

export const UserInformationQuery = gql`
  query userById($id: Int!) {
    userById(id: $id) {
      data
    }
  }
`;

export const VALIDATE_SESSION_QUERY = gql`
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
  mutation createSession($session: AuthInput!) {
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