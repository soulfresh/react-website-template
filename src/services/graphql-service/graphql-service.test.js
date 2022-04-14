import { GraphQLService } from './graphql-service.js'
import { makeGraphQLServiceCacheClient } from './cache'
import { makeGraphQLErrorLink } from '../graphql-utils'
import { createGraphQLServiceMockClient } from './mocks'

// These tests require a schema.
describe('GraphQLService', () => {
  let onAuthFailure

  const userCount = 3;

  const debug = false;
  const build = (options = {}) => {
    const client = createGraphQLServiceMockClient({
      errorLink: makeGraphQLErrorLink(onAuthFailure),
      cache: makeGraphQLServiceCacheClient(),
      generatorOptions: options,
      debug,
    })

    jest.spyOn(client, 'query')
    jest.spyOn(client, 'mutate')
    jest.spyOn(client, 'clearStore')

    return new GraphQLService({ client, debug })
  }

  beforeEach(() => {
    onAuthFailure = jest.fn()
  })

  describe('clear', () => {
    it('should clear the Apollo cache.', () => {
      const api = build({userCount})
      api.clear()

      expect(api.client.clearStore).toHaveBeenCalledTimes(1)
    })
  })

  describe('getUser', () => {
    it('should be able to get all users', async () => {
      const api = build({userCount, includeId: true})
      const result = await api.getUsers()

      expect(api.client.query).toHaveBeenCalledTimes(1)

      expect(result.length).toEqual(userCount)
      expect(result[0]).toEqual({
        id: expect.any(String),
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        name: `${result[0].firstName} ${result[0].lastName}`,
        avatar: expect.any(String),
        bio: expect.any(String),
      })
    })
  })
})
