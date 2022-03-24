- src
  - test
    - <a href="#generateid">generateId</a>
    - <a href="#listof">listOf</a>
    - <a href="#maybegenerate">maybeGenerate</a>
    - <a href="#mostrecentcall">mostRecentCall</a>
    - <a href="#renderwithalldeps">renderWithAllDeps</a>
    - <a href="#renderwithanalytics">renderWithAnalytics</a>
    - <a href="#renderwithrouter">renderWithRouter</a>
    - <a href="#renderwithrouterandanalytics">renderWithRouterAndAnalytics</a>
    - <a href="#silencealllogs">silenceAllLogs</a>
    - <a href="#silencelogs">silenceLogs</a>
    - <a href="#waitforms">waitForMS</a>
    - <a href="#waitforpromise">waitForPromise</a>
    - <a href="#wrapwithalldependencies">wrapWithAllDependencies</a>
    - <a href="#wrapwithanalytics">wrapWithAnalytics</a>
    - <a href="#wrapwithrouter">wrapWithRouter</a>
    - <a href="#wrapwithrouterandanalytics">wrapWithRouterAndAnalytics</a>


## generateId

  ▸ **generateId**(`doGen`) => `void`

Generate a unique id.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| doGen |  | *-* |


#### Returns
`void` 


#### Defined in
- *[src/test/helpers.js:53](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/helpers.js#L53)*

<br/>
## listOf

  ▸ **listOf**(`count`, `generate`) => `void`

Generate a list of items, calling a factory function
to generate each item.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| count |  | `1` |
| generate |  | `...` |


#### Returns
`void` The list of generated items.



#### Defined in
- *[src/test/helpers.js:36](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/helpers.js#L36)*

<br/>
## maybeGenerate

  ▸ **maybeGenerate**(`generate`, `allowEmptyEntities`) => `any`

Randomly generate a value or return undefined. This allows you
to simulate data that might not be returned from an API.
By default it will call the factory (for safety in tests).




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| generate | `Function` | *-* |
| allowEmptyEntities |  | `false` |


#### Returns
`any` The generated item.



#### Defined in
- *[src/test/helpers.js:16](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/helpers.js#L16)*

<br/>
## mostRecentCall

  ▸ **mostRecentCall**(`mockFunc`) => `any`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| mockFunc | `any` | *-* |


#### Returns
`any` 


#### Defined in
- *[src/test/jest.js:11](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/jest.js#L11)*

<br/>
## renderWithAllDeps

  ▸ **renderWithAllDeps**(`component`, `options`) => `RenderResult`





#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| options |  | `{}` |


#### Returns
`RenderResult` 


#### Defined in
- *[src/test/render.js:105](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L105)*

<br/>
## renderWithAnalytics

  ▸ **renderWithAnalytics**(`component`, `[options]`) => `RenderResult`





#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| [options] |  | `{}` |


#### Returns
`RenderResult` 


#### Defined in
- *[src/test/render.js:71](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L71)*

<br/>
## renderWithRouter

  ▸ **renderWithRouter**(`component`, `[options]`) => `RenderResult`





#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| [options] |  | `{}` |


#### Returns
`RenderResult` 


#### Defined in
- *[src/test/render.js:51](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L51)*

<br/>
## renderWithRouterAndAnalytics

  ▸ **renderWithRouterAndAnalytics**(`component`, `[options]`) => `RenderResult`





#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| [options] |  | `{}` |


#### Returns
`RenderResult` 


#### Defined in
- *[src/test/render.js:92](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L92)*

<br/>
## silenceAllLogs

  ▸ **silenceAllLogs**() => `void`





#### Returns
`void` 


#### Defined in
- *[src/test/jest.js:7](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/jest.js#L7)*

<br/>
## silenceLogs

  ▸ **silenceLogs**(`level`) => `void`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| level | `string` | `'log'` |


#### Returns
`void` 


#### Defined in
- *[src/test/jest.js:2](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/jest.js#L2)*

<br/>
## waitForMS

  ▸ **waitForMS**(`ms`) => `Promise`

Wait for the specified number of milliseconds.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| ms | `number` | *-* |


#### Returns
`Promise` 



#### Defined in
- *[src/test/wait.js:18](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/wait.js#L18)*

<br/>
## waitForPromise

  ▸ **waitForPromise**(`promise`) => `Promise`

Wait for the given promise to either resolve or reject.
This helps clarify the intent of tests and prevents
tests from failing if the promise rejects.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| promise | `Promise` | *-* |


#### Returns
`Promise` 



#### Defined in
- *[src/test/wait.js:9](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/wait.js#L9)*

<br/>
## wrapWithAllDependencies

  ▸ **wrapWithAllDependencies**(`component`, `store`, `url`, `analytics`) => `Element`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| store | `any` | *-* |
| url | `any` | *-* |
| analytics | `any` | *-* |


#### Returns
`Element` 


#### Defined in
- *[src/test/render.js:96](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L96)*

<br/>
## wrapWithAnalytics

  ▸ **wrapWithAnalytics**(`component`, `analytics`) => `Element`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| analytics | `any` | `...` |


#### Returns
`Element` 


#### Defined in
- *[src/test/render.js:55](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L55)*

<br/>
## wrapWithRouter

  ▸ **wrapWithRouter**(`component`, `url`, `history`) => `Element`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| url | `any` | *-* |
| history | `any` | *-* |


#### Returns
`Element` 


#### Defined in
- *[src/test/render.js:11](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L11)*

<br/>
## wrapWithRouterAndAnalytics

  ▸ **wrapWithRouterAndAnalytics**(`component`, `url`, `analytics`) => `Element`



#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| component | `any` | *-* |
| url | `any` | *-* |
| analytics | `any` | *-* |


#### Returns
`Element` 


#### Defined in
- *[src/test/render.js:75](https://github.com/soulfresh/react-website-template/tree/master/src/test/src/test/render.js#L75)*

<br/>

