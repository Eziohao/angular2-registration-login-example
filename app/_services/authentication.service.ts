import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {GeolocationService} from '../location/index';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
    

    login(username: string, password: string) {
        let headers=new Headers();
        headers.append('Content-Type','application/vnd.com.covisint.platform.authn.session.req.v1+json');
        headers.append('Accept','application/vnd.com.covisint.platform.session.token.v1+json');
        headers.append('solutionInstanceId','b3eb429a-cb51-4a94-a24f-3dec6f657827');
        console.log(headers);
        var pos=new GeolocationService;
        pos.getLocation().subscribe(
             function(position){
                 console.log(position);
             }
            )
        let data={"authRequest":{
      "service": "AUTHN",
      "subject": username,
      "subjectType":"LOGIN_ID",
      "password": password,
      "subjectInet": "192.168.1.1"
    
                            },
              "city":"city",
              "matter": "matter",
              "personalInfo": "personalInfo",
              "cuid": "testttttt"}
         let requestURL='https://apiqa.np.covapp.io/authn/v4/sessionToken/tasks/generate';
        return this.http.post(requestURL,JSON.stringify(data),{headers:headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                
                if (user && user.idToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log('OK!')
                    console.log('idToken:'+user.idToken);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}