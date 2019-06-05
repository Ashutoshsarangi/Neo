import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { isArray } from 'util';
import { SessionStorageService } from './session-storage.service';

@Injectable()
export class HttpProviderService {

    constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) { }

    get(baseUrl: string, endpointUrl: string, queryParams?: object) {
        let params = new HttpParams();
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const session = this.sessionStorageService.getFromSession('account_details');
        if (session !== undefined) {
            headers = headers.append('token', session.token);
        }

        for (const key in queryParams) {
            if (typeof queryParams[key] !== 'undefined' && queryParams[key] != null) {
                if (isArray(queryParams[key])) {
                    queryParams[key].forEach(element => {
                        params = params.append(key, element);
                    });
                } else {
                    params = params.append(key, queryParams[key]);
                }
            }
        }
        return this.http.get(baseUrl + endpointUrl, { params, headers })
            .pipe();
    }

    post(baseUrl: string, endpointUrl: string, queryParams?: object) {
        let params = new HttpParams();
        let headers = new HttpHeaders();

        const session = this.sessionStorageService.getFromSession('account_details');

        if (session !== undefined) {
            headers = headers.append('token', session.token);
        }

        for (const key in queryParams) {
            if (typeof (queryParams[key]) !== 'undefined' && queryParams[key] != null) {
                if (isArray(queryParams[key])) {
                    queryParams[key].forEach(element => {
                        params = params.append(key, element);
                    });
                } else {
                    params = params.append(key, queryParams[key]);
                }
            }
        }
        return this.http.post(baseUrl + endpointUrl, params, { headers })
            .pipe();
    }

    put(baseUrl: string, endpointUrl: string, queryParams?: object) {
        let params = new HttpParams();
        let headers = new HttpHeaders();

        const session = this.sessionStorageService.getFromSession('account_details');
        // console.log(session.token)

        if (session !== undefined) {
            headers = headers.append('token', session.token);
        }

        for (const key in queryParams) {
            if (typeof (queryParams[key]) !== 'undefined' && queryParams[key] != null) {
                if (isArray(queryParams[key])) {
                    queryParams[key].forEach(element => {
                        params = params.append(key, element);
                    });
                } else {
                    params = params.append(key, queryParams[key]);
                }
            }
        }

        return this.http.put(baseUrl + endpointUrl, params, { headers })
            .pipe();
    }

    delete(baseUrl: string, endpointUrl: string, queryParams?: object) {
        let params = new HttpParams();
        let headers = new HttpHeaders();

        const session = this.sessionStorageService.getFromSession('account_details');

        if (session !== undefined) {
            headers = headers.append('token', session.token);
        }

        for (const key in queryParams) {
            if (typeof (queryParams[key]) !== 'undefined' && queryParams[key] != null) {
                if (isArray(queryParams[key])) {
                    queryParams[key].forEach(element => {
                        params = params.append(key, element);
                    });
                } else {
                    params = params.append(key, queryParams[key]);
                }
            }
        }

        return this.http.delete(baseUrl + endpointUrl, { headers, params })
            .pipe();
    }

    download(baseUrl: string, endpointUrl: string, queryParams?: object) {
        let params = new HttpParams();
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const session = this.sessionStorageService.getFromSession('account_details');
        if (session !== undefined) {
            headers = headers.append('token', session.token);
        }

        for (const key in queryParams) {
            if (typeof queryParams[key] !== 'undefined' && queryParams[key] != null) {
                if (isArray(queryParams[key])) {
                    queryParams[key].forEach(element => {
                        params = params.append(key, element);
                    });
                } else {
                    params = params.append(key, queryParams[key]);
                }
            }
        }
        return this.http.get(baseUrl + endpointUrl, { responseType: 'blob', headers })
            .pipe();
    }
}
