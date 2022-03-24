import { gql } from '@apollo/client'

// Example of a summary definition
const userSummary = `
  user_id
  email
  first_name
  last_name
`;

// Example of an object definition
const user = {
  summary: userSummary,
  detail: `
    ${userSummary}
    profile_picture
    bio
  `,
};

// Example of how to combine object relationship definitions
// const item = {
//   summary: itemSummary,
//   detail: `
//     ${itemSummary}
//     images { ${image.detail} }
//   `
// };

// export const GET_USERS = gql`
//   query getUsers() {
//     apt_snapshot_user() {
//       user_id
//       email
//       name
//       ownership_group {
//         ownership_group_id
//         name
//         ${user.detail}
//         properties(order_by: { name: asc }) {
//           name
//           property_id
//           ownership_group_id
//         }
//       }
//     }
//   }
// `

// Example GraphQL statement
export const GET_USERS = gql`
  query getUsers {
    users {
      ${user.summary}
    }
  }
`;

