import { Injectable } from '@angular/core';
import { HttpProviderService } from '../../services/http-provider.service';
import { AppConstants } from '../../config/constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AdminService {

    constructor(public http: HttpProviderService) { }

    // will show changes even on coming back to page after going forward
    public getMember = new BehaviorSubject<any | null>([]);
    getMember$ = this.getMember.asObservable();

    public getProjects = new BehaviorSubject<any | null>([]);
    getProjects$ = this.getProjects.asObservable();

    public setSidebarActiveTab = new BehaviorSubject<any | null>([]);
    sidebarActiveTab$ = this.setSidebarActiveTab.asObservable();

    getNotification() {
        return this.http.get(AppConstants.API_URL, '/notifications/get', {});
    }

    getTodos() {
        return this.http.get(AppConstants.API_URL, '/todos/get', {});
    }

    getAllProjects() {
        return this.http.get(AppConstants.API_URL, '/projects/get', {});
    }

    getProjectById(id) {
        return this.http.get(AppConstants.API_URL, '/projects/get/' + id, {});
    }

    getMembersCount(id) {
        return this.http.get(AppConstants.API_URL, '/projectmembers/getMembers/' + id, {});
    }

    getProjectNotifications(id) {
        return this.http.get(AppConstants.API_URL, '/notifications/project/' + id, {});
    }

    getProjectReports(id, data) {
        return this.http.get(AppConstants.API_URL, '/reports/get/projectReports/' + id, data);
    }

    getAllMembers() {
        return this.http.get(AppConstants.API_URL, '/members/get', {});
    }

    getAllRoles() {
        return this.http.get(AppConstants.API_URL, '/roles/get', {});
    }

    addMember(data) {
        return this.http.post(AppConstants.API_URL, '/members/add', data);
    }

    getMemberDetails(id) {
        return this.http.get(AppConstants.API_URL, '/members/get/' + id, {});
    }

    updateMemberDetails(id, data) {
        return this.http.put(AppConstants.API_URL, '/members/update/' + id, data);
    }

    changePassword(id, data) {
        return this.http.put(AppConstants.API_URL, '/members/changepassword/' + id, data);
    }

    removeMember(id) {
        return this.http.delete(AppConstants.API_URL, '/members/remove/' + id, {});
    }

    addProject(data) {
        return this.http.post(AppConstants.API_URL, '/projects/add', data);
    }

    updateProject(id, data) {
        return this.http.put(AppConstants.API_URL, '/projects/update/' + id, data);
    }

    getInvestorProject(id) {
        return this.http.get(AppConstants.API_URL, '/projectmembers/getProject/' + id, {});
    }

    addReport(data) {
        return this.http.post(AppConstants.API_URL, '/reports/add', data);
    }

    removeReport(id, data) {
        return this.http.delete(AppConstants.API_URL, '/reports/remove/' + id, data);
    }

    updateReport(id, data) {
        return this.http.put(AppConstants.API_URL, '/reports/update/' + id, data);
    }

    uploadReportFile(id, data) {
        return this.http.put(AppConstants.API_URL, '/reports/upload/' + id, data);
    }

    downloadReport(id) {
        return this.http.download(AppConstants.API_URL, '/reports/download/' + id, {});
    }

    addProjectMember(data) {
        return this.http.post(AppConstants.API_URL, '/projectmembers/add', data);
    }

    removeProjectmember(id, data) {
        return this.http.delete(AppConstants.API_URL, '/projectmembers/remove/' + id, data);
    }

    getDirData(id) {
        return this.http.get(AppConstants.API_URL, '/projects/getdirdata/' + id, {});
    }

    removeFile(path) {
        return this.http.put(AppConstants.API_URL, '/projects/remove/file', path);
    }

    createFolder(data, id) {
        return this.http.post(AppConstants.API_URL, '/projects/createDir/' + id, data);
    }

    uploadAssetsFiles(data, id) {
        return this.http.post(AppConstants.API_URL, '/projects/uploadAssets/' + id, data);
    }
}
