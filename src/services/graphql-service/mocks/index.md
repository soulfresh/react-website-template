- root
  - <a href="#generateexampleservice">generateGraphQLService</a>
  - <a href="#createexampleserviceclientmock">createGraphQLServiceMockClient</a>


## generateGraphQLService

`generate` provides factories for generating each
of the types defined in our Example API schema (`~/example-graph-api-schema.graphql`).

You can use the `generate` factories in your tests,
in your Storybook stories and in the Apollo mocks
(defined in `example-service-schema-mocks.ts`).
The shape of the values returned by the `generate`
factories match the shape returned by the Example API
GraphQL schema. This is great when mocking GraphQL
responses but less useful if your tests/stories do not
hit the Example API Service class (this will be the case
everywhere except integration tests). In those cases,
you should pass the data returned by `generate` through one of the
`fromGraphQL` transform methods in order to
get the same shape of data returned by the Example API Service.

```js
import { transform } from '~/services/example-service';
import { generate } from '~/services/example-service/mocks';

// Create a user object as it is returned by GraphQL
const user = generate.user();

// Transform the user object for use in the application
const property = transform.user(user);

// Now you can pass the property object directly to
// your components.
```

### Developer Notes

Each of the factories on this object should match the name
of a type definition in the `~/example-graph-api-schema.graphql`
file and should return a value matching that type.






#### Defined in
- *[example-service-generate.js:47](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/mocks/example-service-generate.js#L47)*

<br/>
## createGraphQLServiceMockClient

  ▸ **createGraphQLServiceMockClient**(`__namedParameters`) => `ApolloClient`

Creates a mock Apollo client that will auto generate fake data
for requests against it using the mocks returned by `createGraphMocks`.
You can use this function to create Apollo clients that
return mock data during testing, the mock server or Storybook.

For information on how the schema mocks, see
https://www.graphql-tools.com/docs/mocking#mocking-custom-scalar-types




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| __namedParameters |  | `{}` |


#### Returns
`ApolloClient` 


#### Defined in
- *[example-service-schema-mocks.js:23](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/mocks/example-service-schema-mocks.js#L23)*

<br/>
