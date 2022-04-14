import { gql } from '@apollo/client'
import { fragments } from './graphql-service.fragments'

// Example GraphQL statement with reusable fragments
export const GET_USERS = gql`
  ${fragments.UserDetail}
  query getUsers {
    users {
      ...UserDetail
    }
  }
`;

