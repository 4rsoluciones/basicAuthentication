import {Injectable} from "@angular/core";
import {HttpInterceptorService, getHttpHeadersOrInit} from "ng-http-interceptor";

@Injectable()
export class BasicAuthenticatorInterceptor {

  apiConfig: any;

  constructor(private httpInterceptor: HttpInterceptorService) {

    this.httpInterceptor.request().addInterceptor((data, method) => {
      if (this.getAuthType(data[0]) == 'basic') {
        let username: string;
        let password: string;
        username = window.localStorage['username'];
        password = window.localStorage['password'];
        if (username != undefined && password != undefined) {
          window.localStorage['AuthorizationBasic'] = btoa(username + ':' + password);
          window.localStorage.removeItem('username');
          window.localStorage.removeItem('password');
        }
        let authorizationBasic = window.localStorage['AuthorizationBasic'];
        if (authorizationBasic != undefined) {
          const headers = getHttpHeadersOrInit(data, method);
          headers.set('Authorization', 'basic ' + authorizationBasic);
          headers.set('Content-Type', 'application/json');
        }
      }
      return data;
    });
  }

  setApiConfig(apiConfig): any {
    this.apiConfig = apiConfig;
  }

  getAuthType(url): string {
    if (this.isApiRequested(url)) {
      for (let i = 0; i < this.apiConfig.accessControl.length; i++) {
        if (url.indexOf(this.apiConfig.accessControl[i].url) !== -1) {
          return this.apiConfig.accessControl[i].auth;
        }
      }
      return this.apiConfig.defaultAuth;
    } else {
      return 'public';
    }
  }

  isApiRequested(url): boolean {
    for (let i = 0; i < this.apiConfig.api.length; i++) {
      if (url.indexOf(this.apiConfig.api[i].url) !== -1) {
        return true;
      }
    }
    return false;
  }

}