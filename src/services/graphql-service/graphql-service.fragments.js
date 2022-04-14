import { gql } from '@apollo/client'

const UserSummary = gql`
  fragment UserSummary on user {
    user_id
    email
    first_name
    last_name
  }
`

const UserDetail = gql`
  ${UserSummary}
  fragment UserDetail on user {
    ...UserSummary
    profile_picture
    bio
  }
`

export const fragments = {
  UserSummary,
  UserDetail,
}
