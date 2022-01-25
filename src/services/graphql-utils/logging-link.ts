import { ApolloLink, Observable } from '@apollo/client'
import { getOperationAST } from 'graphql'

import { loggerMixin } from '@thesoulfresh/utils'

type Level = 'debug' | 'info' | 'warn' | 'error'

/**
 * Apollo link object that will log GraphQL requests.
 * @private
 */
/* istanbul ignore next: Not important to test */
export class LoggingLink extends ApolloLink {
  level: string

  constructor(
    /**
     * The level at which to perform debug logging.
     */
    level: Level = 'debug',
  ) {
    super()

    this.level = level

    // Add logging functionality
    loggerMixin(this, '[GRAPHQL]')
  }

  logOperation(operation, type, ...rest) {
    let args = [operation.operationName]

    if (operation.variables && Object.keys(operation.variables).length > 0) {
      args.push(operation.variables)
    }

    if (type) {
      args.unshift(type)
    }

    if (rest) {
      args = args.concat(rest)
    }

    this[this.level].apply(this, args)
  }

  request(operation, forward) {
    const operationAST = getOperationAST(
      operation.query,
      operation.operationName,
    )
    const isSubscription =
      !!operationAST && operationAST.operation === 'subscription'
    if (!isSubscription) {
      this.logOperation(operation, 'START')
    }
    return new Observable((observer) => {
      if (isSubscription) {
        this.logOperation(operation, 'SUBSCRIBE')
      }
      const sub = forward(operation).subscribe({
        next: (result) => {
          this.logOperation(operation, 'RESULT', result)
          observer.next(result)
        },
        error: (error) => {
          this.logOperation(operation, 'ERROR', error)
          observer.error(error)
        },
        complete: observer.complete.bind(observer),
      })
      return () => {
        if (isSubscription) {
          this.logOperation(operation, 'UNSUBSCRIBE')
        }
        sub.unsubscribe()
      }
    })
  }
}
