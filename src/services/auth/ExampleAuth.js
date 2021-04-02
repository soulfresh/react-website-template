import { ServiceBase } from '@thesoulfresh/utils';
import { env } from '../../env';

export class ExampleAuth extends ServiceBase {
  /**
   * NOTE
   * The following is just an example of how you might construct
   * your auth client.
   *
   * @param {boolean} verbose - Whether to perform verbose logging.
   * @param {*} [client] - Allows passing injecting any dependent
   *   client objects.
   */
  constructor(verbose = env.verbose, client = null) {
    super(client, verbose);
  }

  /**
   * Get the user's current authenticated state.
   *
   * NOTE
   * The implementation is up to you but a good option
   * is to return null if the user is not authenticated
   * and the API response if they are.
   */
  getUser() {
    // NOTE The following auth response is for illustration
    // purposes only. Your implementation can return whatever
    // you need it to.
    return Promise.resolve({user: 'Bob'});
  }

  /**
   * Authenticate the user.
   */
  authenticate() {
    return Promise.resolve({user: 'Bob'});
  }

  // Any other methods of this class will be dependent
  // on your needs but will probably include login and logout methods.
}

