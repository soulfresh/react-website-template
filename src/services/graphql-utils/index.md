- app
  - src
    - services
      - graphql-utils
        - <a href="#graphqlerrorhandler">graphQLErrorHandler</a>
        - <a href="#makegraphqlerrorlink">makeGraphQLErrorLink</a>


## graphQLErrorHandler

  ▸ **graphQLErrorHandler**(`__namedParameters`) => `void`

A global error handler used to handle GraphQL errors
before they are dispatched to individual GraphQL query
handlers. This method is called for each error with
parameters describing any GraphQL or network errors.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| __namedParameters |  | *-* |


#### Returns
`void` 


#### Defined in
- *[app/src/services/graphql-utils/errors.ts:11](https://github.com/Apartment-Snapshot/snapshot-ui/tree/main/app/src/services/graphql-utils/app/src/services/graphql-utils/errors.ts#L11)*

<br/>
## makeGraphQLErrorLink

  ▸ **makeGraphQLErrorLink**(`onAuthFailure`) => `ApolloLink`

Make an apollo-link-error instance that is configured to use the
global error handler.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| onAuthFailure | () => `void` | *-* |


#### Returns
`ApolloLink` 


#### Defined in
- *[app/src/services/graphql-utils/errors.ts:73](https://github.com/Apartment-Snapshot/snapshot-ui/tree/main/app/src/services/graphql-utils/app/src/services/graphql-utils/errors.ts#L73)*

<br/>



