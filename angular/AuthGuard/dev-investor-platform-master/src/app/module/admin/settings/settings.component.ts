import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { AdminService } from '../admin.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from '../../../config/constants';
import { PaginationService } from '../../../shared/pagination/pagination.service';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { NgProgress } from 'ngx-progressbar';

declare var $: any;

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    @ViewChild('fileInput') fileInput: ElementRef;

    public memberArray: Array<any>;
    public memberLoginArray: Array<any>;
    public notificationArray: Array<any>;
    public notificationMessage: string;
    public roleArray: Array<any>;
    public tab: string;
    public isShow: boolean;
    public passwordShow: boolean;
    public action: string;
    public memberDetails: any = {};
    public isAdmin: boolean;
    public fileExt: string;
    public formValue: any = {
        'first_name': [''],
        'last_name': [''],
        'email': [''],
        'image': [''],
        'currentImage': [''],
        'password': [''],
        'confirm_password': [''],
        'job_description': [''],
        'phone': [''],
        'roleId': ['']
    };

    public changePassForm: any = {
        'old_password': [''],
        'new_password': [''],
        'confirm_new_password': ['']
    };
    memberForm: FormGroup;
    changePasswordForm: FormGroup;
    sessionDetails: any;

    public nodeBaseUrl: string = AppConstants.BASE_URL;
    public previewImage: any;
    public modal: any;

    // Image Cropping
    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
    imageChangedEvent: any;
    showCropper = false;
    croppedImage: any = '';

    constructor(
        private router: Router,
        private adminService: AdminService, private formBuilder: FormBuilder,
        private renderer: Renderer2, private paginationService: PaginationService,
        private sessionStorageService: SessionStorageService,
        private authService: AuthService, private ngbModal: NgbModal, private ngProgress: NgProgress) {
        this.memberForm = this.formBuilder.group(this.formValue);
        this.changePasswordForm = this.formBuilder.group(this.changePassForm);
    }

    memberPager: any = {};
    memberItems: any[];

    lastLoginPager: any = {};
    lastLoginItems: any[];

    ngOnInit() {
        $.getScript('./assets/js/custom.js');
        this.tab = 'members';
        this.isShow = false;
        this.passwordShow = true;
        this.action = 'add';

        this.sessionDetails = this.authService.isAuthenticated();
        this.ngProgress.start();
        this.getMembers();
        this.getRoles();
        this.getActivities();
    }

    getMembers() {
        this.adminService.getAllMembers().subscribe((allMembers: any) => {
            this.memberArray = allMembers;
            const array = ['allMember', 'lastLogin'];
            array.forEach((eachItem) => {
                this.setPage(1, this.memberArray, eachItem);
            });
        }, (error) => {
            console.error(error);
        });
    }

    getRoles() {
        this.adminService.getAllRoles().subscribe((roles: any) => {
            this.roleArray = roles;
        }, (error) => {
            console.log(error);
        });
    }

    getActivities() {
        this.adminService.getNotification().subscribe((notifications: any) => {
            this.ngProgress.done();
            if (notifications.message) {
                this.notificationMessage = 'No Activity';
            } else {
                notifications.forEach(element => {
                    const msPerMinute = 60 * 1000;
                    const msPerHour = msPerMinute * 60;
                    const msPerDay = msPerHour * 24;
                    const msPerMonth = msPerDay * 30;
                    const msPerYear = msPerDay * 365;
                    let time: any = 0;
                    const elapsed = Date.now() - new Date(element.updatedAt).getTime();

                    if (elapsed < msPerMinute) {
                        time = Math.round(elapsed / 1000) + ' seconds ago';
                    } else if (elapsed < msPerHour) {
                        time = Math.round(elapsed / msPerMinute) + ' minutes ago';
                    } else if (elapsed < msPerDay) {
                        time = Math.round(elapsed / msPerHour) + ' hours ago';
                    } else if (elapsed < msPerMonth) {
                        time = Math.round(elapsed / msPerDay) + ' days ago';
                    } else if (elapsed < msPerYear) {
                        time = Math.round(elapsed / msPerMonth) + ' months ago';
                    } else {
                        time = 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
                    }
                    element.time = time;
                });
                this.notificationArray = notifications;
            }
        });
    }

    visibleMemberForm(visibility, action) {
        this.memberForm.reset();
        if (action === 'update') {
            const formControls = this.memberForm.controls;
            this.passwordShow = false;
            Object.keys(this.formValue).forEach((k) => {
                formControls[k].setValue(this.memberDetails[k]);
            });
            this.memberForm.controls['roleId'].setValue(this.memberDetails.role.id);
        } else {
            this.passwordShow = true;
            this.memberForm.controls['roleId'].setValue('1');
            this.previewImage = 'assets/images/add-user.png';
        }

        if (visibility === true) {
            this.renderer.addClass(document.body, 'fixed');
            this.tab = '';
        } else {
            this.renderer.removeClass(document.body, 'fixed');
            this.tab = 'members';
        }

        this.isShow = visibility;
        this.action = action;
    }

    submitForm() {
        const memberData = this.memberForm.value;
        this.adminService.addMember(memberData).subscribe((success: any) => {
            this.memberForm.controls['image'].setValue('');
            this.visibleMemberForm(false, 'add');
            this.getMembers();
        }, (error) => {
            console.log(error);
            alertFunctions.errorPopup(
                'Add Member Error',
                error.error.message,
                'Ok',
            ).then(result => {
            });
        });
    }

    openChangePassForm(changePasswordModal) {
        const accountDetails = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_KEY);
        if (accountDetails.role.name === 'Administrator') {
            this.isAdmin = true;
        }

        this.changePasswordForm.reset();
        this.modal = this.ngbModal.open(changePasswordModal);
    }

    changePass(id) {
        const passwordData = this.changePasswordForm.value;
        this.adminService.changePassword(id, passwordData).subscribe((success: any) => {
            this.changePasswordForm.reset();
            this.modal.dismiss();
            this.visibleMemberForm(false, 'add');
            const accountDetails = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_KEY);
            if (accountDetails.id === id) {
                this.authService.logout();
                this.router.navigate(['/welcome']);
            }
        }, (error) => {
            console.log(error);
            alertFunctions.errorPopup(
                'Change Password Error',
                error.error.message,
                'Ok',
            ).then(result => {
            });
        });
    }

    getMember(id) {
        this.adminService.getMemberDetails(id).subscribe((success: any) => {
            this.memberDetails = success;
            this.visibleMemberForm(true, 'update');
            this.previewImage =
                (this.memberDetails.image) ? this.nodeBaseUrl + '/' + this.memberDetails.image : 'assets/images/user-default.png';
            this.memberForm.controls['currentImage'].setValue(this.previewImage);
        }, (error) => {
            console.log(error);
        });
    }

    removeMember(id) {
        alertFunctions.confirmPopup(
            'Remove Member',
            'Are you sure, you want to remove member ?',
            'Yes',
            'Cancel',
            true
        ).then(result => {
            if (result.value) {
                this.adminService.removeMember(id).subscribe((success: any) => {
                    this.getMembers();
                }, (error) => {
                    console.log(error);
                });
            }
        });
    }

    updateMember(id) {
        const memberData = this.memberForm.getRawValue();
        this.adminService.updateMemberDetails(id, memberData).subscribe((success: any) => {
            this.visibleMemberForm(false, 'add');
            const accountDetails = this.sessionStorageService.getFromSession(AppConstants.loginConfig.SESSION_KEY);
            if (id === accountDetails.id) {
                this.adminService.getMemberDetails(id).subscribe((suc: any) => {
                    this.adminService.getMember.next(suc);
                }, (error) => {
                });
            }
            this.getMembers();
        }, (error) => {
            console.log(error);
            alertFunctions.errorPopup(
                'Update Member Error',
                error.error.message,
                'Ok',
            ).then(result => {
            });
        });
    }

    onFileChange(event, content) {
        this.ngbModal.open(content, { centered: true }).result.then((result) => {
            this.previewImage = this.croppedImage;
            const base64Image = encodeURIComponent(this.previewImage);
            this.memberForm.controls['image'].setValue(base64Image);
        }, (reason) => {

        });
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded() {
        this.showCropper = true;
    }

    cropperReady() {
        console.log('Cropper ready');
    }

    loadImageFailed() {
        alertFunctions.errorPopup(
            'Add Member Image Error',
            'Only jpeg, png, jpg Images Allowded',
            'Ok',
        ).then(result => {
        });
    }

    closePopup($event) {
        if ($event.srcElement.classList.value.indexOf('dropdown-menu') !== -1
            && $event.srcElement.classList.value.indexOf('dropdown-menu-right') !== -1) {
            this.visibleMemberForm(false, 'add');
        }
    }

    setPage(page: number, data, section) {
        let pageSize = 0;
        switch (section) {
            case 'allMember':
                pageSize = 5;
                this.memberPager = this.paginationService.getPager(data.length, page, pageSize);
                this.memberItems = data.slice(this.memberPager.startIndex, this.memberPager.endIndex + 1);
                break;
            case 'lastLogin':
                pageSize = 5;
                this.lastLoginPager = this.paginationService.getPager(data.length, page, pageSize);
                this.lastLoginItems = data.slice(this.lastLoginPager.startIndex, this.lastLoginPager.endIndex + 1);
                break;
        }
    }
}
