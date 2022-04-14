
/**
 * `toExampleGraph` allows transforming data
 * from the application domain model to
 * the relational data model used in GraphQL.
 *
 * @see fromExampleGraph for transformations coming from GraphQL.
 */
export const toGraphQL = {
  user: (u) => ({
    user_id: u.id,
    email: u.email,
    first_name: u.firstName,
    last_name: u.lastName,
  }),
}
