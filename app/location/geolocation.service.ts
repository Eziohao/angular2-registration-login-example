import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

let GEOLACTION_ERRORS={
	'errors.location.unsupportedBrowser': 'Browser does not support location services',
	'errors.location.permissionDenied': 'You have rejected access to your location',
	'errors.location.positionUnavailable': 'Unable to determine your location',
	'errors.location.timeout': 'Service timeout has been reached'
};
@Injectable()

export class GeolocationService{
	public getLocation(opts):Observable<any>{
		return Observable.create(observer=>{
			if(window.navigator&&window.navigator.geolocation){
				window.navigator.geolocation.getCurrentPosition((position)=>{
					observer.next(position);
                    observer.complete();
				},
				(error)=>{
					switch (error.code) {
						case 1:
							observer.error(GEOLACTION_ERRORS['errors.location.permissionDenied'])// code...
							break;
						
						case 2:
							observer.error(GEOLACTION_ERRORS['errors.location.positionUnavailable'])// code...
							break;
						case 3:
							observer.error(GEOLACTION_ERRORS['errors.location.timeout'])
					}
				},
				opts);
			}
			else{
				observer.error(GEOLACTION_ERRORS['errors.location.unsupportedBrowser']);
			}
		})
	}
}