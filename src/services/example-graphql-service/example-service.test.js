import { ExampleService } from './example-service.js'
import { makeExampleServiceCacheClient } from './cache'
import { makeGraphQLErrorLink } from '../graphql-utils'
import { createExampleServiceClientMock } from './mocks'

// These tests require a schema.
describe('ExampleService', () => {
  let onAuthFailure

  const userCount = 3;

  const debug = false;
  const build = (options = {}) => {
    const client = createExampleServiceClientMock({
      errorLink: makeGraphQLErrorLink(onAuthFailure),
      cache: makeExampleServiceCacheClient(),
      generatorOptions: options,
      debug,
    })

    jest.spyOn(client, 'query')
    jest.spyOn(client, 'mutate')
    jest.spyOn(client, 'clearStore')

    return new ExampleService({ client, debug })
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
      const api = build({userCount})
      const result = await api.getUsers()

      expect(api.client.query).toHaveBeenCalledTimes(1)

      expect(result.length).toEqual(userCount)
      expect(result[0]).toEqual({
        id: expect.any(Number),
        email: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        name: `${result[0].firstName} ${result[0].lastName}`,
      })
    })
  })
})
