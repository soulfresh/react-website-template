type Bag = { [key: string]: any }

export type User = {
  id: string
  email: string
  name: string
}

/**
 * `fromExampleGraph` allows you to transform data from
 * the relational data model returned from GraphQL into
 * the application domain model used in the client code.
 * This sheilds the application from relational data changes
 * that don't affect the application's logic or data structure.
 */
export const fromExampleGraph = {
  user: (u: Bag = {}): User => ({
    id: u.user_id,
    email: u.email,
    name: u.name,
  }),
}
