import { fromExampleGraph } from './fromExampleGraph'

describe('fromExampleGraph', () => {
  it('user', () => {
    expect(
      fromExampleGraph.user({
        user_id: 'foo',
        email: 'bar',
        name: 'baz',
      }),
    ).toEqual({
      id: 'foo',
      email: 'bar',
      name: 'baz',
    })
  })
})
