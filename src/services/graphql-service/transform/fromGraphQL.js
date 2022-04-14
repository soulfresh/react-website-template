
/**
 * `fromExampleGraph` allows you to transform data from
 * the relational data model returned from GraphQL into
 * the application domain model used in the client code.
 * This sheilds the application from relational data changes
 * that don't affect the application's logic or data structure.
 */
export const fromGraphQL = {
  user: (u = {}) => ({
    id: u.user_id,
    email: u.email,
    firstName: u.first_name,
    lastName: u.last_name,
    name: `${u.first_name} ${u.last_name}`,
    avatar: u.profile_picture,
    bio: u.bio,
  }),
}
