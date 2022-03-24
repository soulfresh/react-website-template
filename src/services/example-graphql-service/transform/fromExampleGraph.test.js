import { randFirstName, randLastName, randEmail } from '@ngneat/falso'
import { fromExampleGraph } from './fromExampleGraph'

describe('fromExampleGraph', () => {
  it('user', () => {
    const firstName = randFirstName();
    const lastName = randLastName();
    const user = {
      user_id: 10,
      email: randEmail(),
      first_name: firstName,
      last_name: lastName,
    }

    expect(fromExampleGraph.user(user)).toEqual({
      id: user.user_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      name: `${user.first_name} ${user.last_name}`,
    })
  })
})
