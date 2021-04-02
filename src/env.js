import { snakeCase } from 'snake-case';

/**
 * A Proxy around `process.env` that allows
 * you to access variables without remembering to
 * prefix the variable names with "REACT_APP_".
 * However, you can still reference them that way
 * if you choose. Additionally, you can expose helpers
 * on this class to simplify using variables.
 *
 * Some Examples:
 * --------------
 * env.name === process.env.REACT_APP_NAME
 * env.REACT_APP_NAME === process.env.REACT_APP_NAME
 * env.production === (process.env.NODE_ENV === 'production')
 */
export class EnvWrapper {
  constructor(env = process.env) {
    const me = this;
    return new Proxy(env, {
      get: function(target, prop, receiver) {
        // If the property is defined on this class, use that.
        if (me[prop]) {
          return me[prop];
        }
        // If the property is defined on process.env, use that.
        else if (target[prop]) {
          return Reflect.get(target, prop, receiver);
        }
        // If the prop is something like "fooBar",
        // then look for "REACT_APP_FOO_BAR".
        else {
          const snaked = 'REACT_APP_' + snakeCase(prop).toUpperCase();
          if (target[snaked]) {
            return Reflect.get(target, snaked, receiver);
          }
        }
      }
    });
  }

  // The environment we are currently running in.
  environment = process.env.NODE_ENV

  // Specific environment flags...
  production  = process.env.NODE_ENV === 'production'
  development = process.env.NODE_ENV === 'development'
  test        = process.env.NODE_ENV === 'test'

  // Whether or not to perform verbose logging.
  get verbose() {
    return process.env.REACT_APP_VERBOSE === 'true' &&
      // Allow turning off verbose through a query param.
      // TODO Allow turning verbose logging on in production.
      // TODO Read this at startup and retain the value
      // for the rest of the session.
      window.location.search.indexOf('verbose=false') < 0;
  }

  // Whether or not to run against mock APIs.
  mock = process.env.REACT_APP_MOCK_APIS === 'true'

  // The name of the app.
  appName = process.env.REACT_APP_NAME

  /**
   * Log the environment variables.
   */
  log() {
    if (!env.production && env.verbose && !env.test) {
      console.log('[ENV] environment:', env.environment);
      for (let key in env) {
        const blacklist = ['log', 'environment', 'graphAPIKey'];
        if (blacklist.indexOf(key) === -1) {
          console.log(`[ENV] ${key}:`, env[key]);
        }
      }
    }
  }
}

export const env = new EnvWrapper(process.env);
