import { Injectable } from '@angular/core';
// import swal from 'sweetalert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class WebServicesService {

    constructor(private http: HttpClient, ) { }
    private BASE_URL = 'http://879a8e17.ngrok.io/api_v1';

    private loginResp = {};
    get(endPoint): Observable<any> {

        return this.http.get(this.BASE_URL + endPoint);

    }

    post(endpoint, params): Observable<any> {
        console.log('url => ' + this.BASE_URL + endpoint);
        console.log(params);
        return this.http.post(this.BASE_URL + endpoint, params);
    }
    // setup Storage
    loginServices(endpoints, params) {
        this.post(endpoints, params).subscribe((item) => {
            console.log(item);
            // return item;
        });
    }

    registerUser(endpoint, params): Observable<any> {
        let data = {
            username: params.username,
            password: params.password,
            contact_number: params.contact,
            email_id: params.emailId,
            address: params.address
        }
        console.log(data);
        return this.post(endpoint, data);
        // this.post(endpoint, data).subscribe((item) => {
        //     console.log(item);
        //     return item;
        // });
    }
    loginUser(endpoint, params): Observable<any> {
        return this.post(endpoint, params);
    }

    // getStorage
    getData(key): any {
        if (window.localStorage.getItem(key)) {
            return JSON.parse(window.localStorage.getItem(key));
        } else {
            return null;
        }
    }
    // set data in storage
    setData(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    // Custom Alert messages
    customSaveAlert(message) {
        // swal({
        //     // title: 'Good job!',
        //     text: message,
        //     icon: 'success',
        //     button: 'Ok',
        // });
        alert(message)
    }
    customErrorAlert(message) {
        // swal({
        //     // title: 'Good job!',
        //     text: message,
        //     icon: 'warning',
        //     button: 'Ok',
        // });
        alert(message)
    }


    //Vender Apis
    //Add vender
    addVender(endpoints, params): Observable<any> {
        return this.post(endpoints, params);
    }
    //get Vender List
    getVender(endpoints): Observable<any> {
        return this.get(endpoints);
    }
}
