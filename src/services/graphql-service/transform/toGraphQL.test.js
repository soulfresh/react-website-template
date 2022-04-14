import { randFirstName, randLastName, randEmail } from '@ngneat/falso'
// import { generate as gen } from '../mocks'
import { toGraphQL } from './toGraphQL'

describe('toGraphQL', () => {
  it('user', () => {
    const firstName = randFirstName();
    const lastName = randLastName();
    const user = {
      id: 10,
      email: randEmail(),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
    }

    expect(toGraphQL.user(user)).toEqual({
      user_id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    })
  })
});
