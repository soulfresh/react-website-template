- root
  - <a href="#exampleservice">ExampleService</a>
    - <a href="#constructor">constructor</a>
    - <a href="#clear">clear</a>
    - <a href="#getusers">getUsers</a>
  - <a href="#exampleservicecontext">ExampleServiceContext</a>
  - <a href="#exampleserviceprovider">ExampleServiceProvider</a>
  - <a href="#get_users">GET_USERS</a>
  - <a href="#makeexampleservicecacheclient">makeExampleServiceCacheClient</a>
  - <a href="#useexampleservice">useExampleService</a>
- transform
  - <a href="#fromexamplegraph">fromExampleGraph</a>
  - <a href="#toexamplegraph">toExampleGraph</a>
  - <a href="#collapsenestedrelationships">collapseNestedRelationships</a>
  - <a href="#preparenestedrelationships">prepareNestedRelationships</a>


## ExampleService Class

__Extends__
`unknown`


<br/>

### new ExampleService( __namedParameters )



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| __namedParameters | `Object` | *-* |


#### Defined in
- *[example-service.js:28](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/example-service.js#L28)*

<br/>### ExampleService.clear


Clear the data cache (for example after logout).
Returns a promise that will resolve after the
cache has been cleared.

For more info, see:
https://www.apollographql.com/docs/react/caching/cache-interaction/#resetting-the-store






#### Defined in
- *[example-service.js:73](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/example-service.js#L73)*

<br/>### ExampleService.getUsers




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| args |  | *-* |


#### Defined in
- *[example-service.js:77](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/example-service.js#L77)*

<br/><br/>
## ExampleServiceContext



`Context`

#### Defined in
- *[example-service.js:157](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/example-service.js#L157)*

<br/>
## ExampleServiceProvider



`Provider`

#### Defined in
- *[example-service.js:158](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/example-service.js#L158)*

<br/>
## GET_USERS



`DocumentNode`

#### Defined in
- *[example-service-definitions.js:51](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/example-service-definitions.js#L51)*

<br/>
## makeExampleServiceCacheClient

  ▸ **makeExampleServiceCacheClient**() => `InMemoryCache`

Make an apollo cache client that can be used to cache results so they're
not always requested from the server.






#### Returns
`InMemoryCache` 


#### Defined in
- *[cache.js:7](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/cache.js#L7)*

<br/>
## useExampleService

  ▸ **useExampleService**() => `undefined`





#### Returns
`undefined` 


#### Defined in
- *[example-service.js:160](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/example-service.js#L160)*

<br/>
## fromExampleGraph

`fromExampleGraph` allows you to transform data from
the relational data model returned from GraphQL into
the application domain model used in the client code.
This sheilds the application from relational data changes
that don't affect the application's logic or data structure.






#### Defined in
- *[transform/fromExampleGraph.js:9](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/transform/fromExampleGraph.js#L9)*

<br/>
## toExampleGraph

`toExampleGraph` allows transforming data
from the application domain model to
the relational data model used in GraphQL.


__See:__ fromExampleGraph for transformations coming from GraphQL. <br/>




#### Defined in
- *[transform/toExampleGraph.js:9](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/transform/toExampleGraph.js#L9)*

<br/>
## collapseNestedRelationships

  ▸ **collapseNestedRelationships**(`original`) => `any`

Perform the inverse of `prepareNestedRelationships`.

```js
collapseNestedRelationships({foo: {data: {bar: 'baz'}}});
// -> {foo: {bar: 'baz'}}
```




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| original | `any` | *-* |


#### Returns
`any` 


#### Defined in
- *[transform/util.js:47](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/transform/util.js#L47)*

<br/>
## prepareNestedRelationships

  ▸ **prepareNestedRelationships**(`original`) => `any`

Transform an object with nested object properties into
GraphQL relationships (ie, replace those properties with
a data property that points to the nested object).

```js
prepareNestedRelationships({foo: {bar: 'baz'}});
// -> {foo: {data: {bar: 'baz'}}}
```




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| original | `any` | *-* |


#### Returns
`any` 


#### Defined in
- *[transform/util.js:16](https://github.com/soulfresh/react-website-template/tree/master/src/services/example-graphql-service/transform/util.js#L16)*

<br/>