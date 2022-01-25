type Bag = { [key: string]: any }

/**
 * `toExampleGraph` allows transforming data
 * from the application domain model to
 * the relational data model used in GraphQL.
 *
 * @see fromExampleGraph for transformations coming from GraphQL.
 */
export const toExampleGraph = {
  user: (u: Bag = {}) => ({
    user_id: u.id,
    email: u.email,
    name: u.name,
  }),
}
