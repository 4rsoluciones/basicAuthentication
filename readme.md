# BASIC AUTHENTICATION PARA IONIC 2

Para utilizar la librería se deben efectuar los siguientes pasos:

- Incluir las librerías en la declaración del módulo app:

/app/app.module.ts
```
import {BasicAuthenticatorInterceptor} from "../lib/basic-authenticator/basic-authenticator.interceptor";
import {HttpInterceptorModule} from "ng-http-interceptor";

@NgModule({
    imports: [
        HttpInterceptorModule
    ],
    providers: [
        BasicAuthenticatorInterceptor
    ]
})
```

- Crear una instancia de la clase en el constructor de la clase MyApp

/app/app.component.ts
```import {BasicAuthenticatorInterceptor} from "basic-authenticator";
export class MyApp {
    constructor(basicAuthenticatorInterceptor: BasicAuthenticatorInterceptor) {}
}
```


- Se debe configurar el componente pasando la configuración de la api y la autenticación al inicio de la aplicación. Aquí se definen una o más URLs de APIs disponibles y los tipos de autenticación en cada web service (los que no se detallan explícitamente, toman el valor defaultAuth). Por ejemplo:

/app/app.component.ts
```basicAuthenticatorInterceptor.setApiConfig({
  'api': [
    {'url': 'http://example.com'}
  ],
  'accessControl': [
    {'url': '/api/login', 'auth': 'public'},
    {'url': '/api/register', 'auth': 'public'},
    {'url': '/api/recover_pass', 'auth': 'public'}
  ],
  'defaultAuth': 'basic'
});
```

- Por ultimo, al momento de invocar la acción *login*, ya sea en el controlador o en el servicio (antes de la llamada http), setear los valores de **usuario** y **contraseña** en localStorage con los siguientes nombres:

```
window.localStorage['username'] = params.username;
window.localStorage['password'] = params.password;
```