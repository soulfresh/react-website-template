import { ExampleService } from './example-service'
import { makeExampleServiceCacheClient } from './cache'
import { makeGraphQLErrorLink } from '../graphql-utils'
import { createExampleServiceClientMock } from './mocks'

describe('ExampleService', () => {
  let onAuthFailure: () => void

  const build = (options = {}) => {
    const client = createExampleServiceClientMock({
      errorLink: makeGraphQLErrorLink(onAuthFailure),
      cache: makeExampleServiceCacheClient(),
      debug: false,
      generatorOptions: options,
    })

    jest.spyOn(client, 'query')
    jest.spyOn(client, 'mutate')
    jest.spyOn(client, 'clearStore')

    return new ExampleService({ client })
  }

  beforeEach(() => {
    onAuthFailure = jest.fn()
  })

  describe('clear', () => {
    it('should clear the Apollo cache.', () => {
      const api = build()
      api.clear()

      expect(api.client.clearStore).toHaveBeenCalledTimes(1)
    })
  })

  describe('getUser', () => {
    it('should be able to get the user, their ownershipGroup and properties', async () => {
      const userEmail = 'test@test.com'
      const api = build({ email: userEmail })
      const result = await api.getUser(userEmail)

      expect(api.client.query).toHaveBeenCalledTimes(1)
      expect(api.client.query).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { email: userEmail },
        }),
      )

      expect(result).toEqual({
        id: expect.any(String),
        email: userEmail,
        name: expect.any(String),
        ownershipGroup: {
          id: expect.any(String),
          name: expect.any(String),
          properties: [
            {
              id: expect.any(String),
              name: expect.any(String),
              ownershipGroupId: expect.any(String),
            },
            {
              id: expect.any(String),
              name: expect.any(String),
              ownershipGroupId: expect.any(String),
            },
          ],
        },
      })
    })
  })

  describe('getProperties', () => {
    it('should be able to get the list of properties available to the user.', async () => {
      const ownershipGroupId = 'test-ownership-group-id'
      const api = build({
        propertyCount: 2,
        ownership_group_id: ownershipGroupId,
      })
      const result = await api.getProperties(ownershipGroupId)

      expect(api.client.query).toHaveBeenCalledTimes(1)

      expect(result.length).toEqual(2)
      expect(result[0]).toEqual({
        id: expect.any(String),
        name: expect.any(String),
        ownershipGroupId: expect.any(String),
      })
    })
  })
})
