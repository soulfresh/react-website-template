- root
  - <a href="#authservice">AuthService</a>
    - <a href="#constructor">constructor</a>
    - <a href="#delay">delay</a>
    - <a href="#loggedin">loggedIn</a>
    - <a href="#loginsuccess">loginSuccess</a>
    - <a href="#user">user</a>
    - <a href="#_authresponse">_authResponse</a>
    - <a href="#authenticate">authenticate</a>
    - <a href="#login">login</a>
    - <a href="#logout">logout</a>
  - <a href="#useauthservice">useAuthService</a>


## AuthService Class

__Extends__
`unknown`


<br/>

### new AuthService( loggedIn, loginSuccess, user, delay )

Service used to authenticate users.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| loggedIn | `boolean` | `true` |
| loginSuccess | `boolean` | `true` |
| user |  | `...` |
| delay | `number` | `0` |


#### Defined in
- *[AuthService.js:7](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L7)*

<br/>### AuthService.delay


#### Defined in
- *[AuthService.js:18](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L18)*

<br/>### AuthService.loggedIn


#### Defined in
- *[AuthService.js:14](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L14)*

<br/>### AuthService.loginSuccess


#### Defined in
- *[AuthService.js:15](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L15)*

<br/>### AuthService.user


#### Defined in
- *[AuthService.js:16](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L16)*

<br/>### AuthService._authResponse








#### Defined in
- *[AuthService.js:26](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L26)*

<br/>### AuthService.authenticate


Check it the user is currently authenticated.
This should be used at application startup to see
if the user has an existing auth token you can use
to keep them logged in. If the returned promise
rejects, then you will need to call `login` to
log the user in.






#### Defined in
- *[AuthService.js:44](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L44)*

<br/>### AuthService.login


Log the user in.






#### Defined in
- *[AuthService.js:62](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L62)*

<br/>### AuthService.logout


Log the user out.






#### Defined in
- *[AuthService.js:81](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/AuthService.js#L81)*

<br/><br/>
## useAuthService

  ▸ **useAuthService**(`authService`, `debug`) => `void`

This hook stores the user's authenticated state and provides
login, logout and forgot login callbacks. Internally it uses
an auth service to perform the authentication steps.




#### Parameters
| Name | Type | Default Value |
| :--- | :--- | :------------ |
| authService | `any` | *-* |
| debug | `any` | `env.verbose` |


#### Returns
`void` 


#### Defined in
- *[useAuthService.js:15](https://github.com/soulfresh/react-website-template/tree/master/src/services/auth/useAuthService.js#L15)*

<br/>
