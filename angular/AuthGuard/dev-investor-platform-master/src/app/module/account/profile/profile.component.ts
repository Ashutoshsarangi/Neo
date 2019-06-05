import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { AdminService } from '../../admin/admin.service';
import { AppConstants } from '../../../config/constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    @ViewChild('fileInput') fileInput: ElementRef;

    isEdit: boolean;
    fullName: string;
    description: string;
    previewImage: any;
    sessionDetails: any;
    public isAdmin: boolean;
    public changePassForm: any = {
        'old_password': [''],
        'new_password': [''],
        'confirm_new_password': ['']
    };

    public userFormDefaults: any = {
        'first_name': [''],
        'last_name': [''],
        'email': [''],
        'image': [''],
        'currentImage': [''],
    };
    userForm: FormGroup;
    changePasswordForm: FormGroup;

    // Image Cropping
    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
    imageChangedEvent: any;
    showCropper = false;
    croppedImage: any = '';

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private router: Router,
        private ngbModal: NgbModal,
        private ngProgress: NgProgress) {
        this.isEdit = false;
        this.userForm = this.formBuilder.group(this.userFormDefaults);
        this.changePasswordForm = this.formBuilder.group(this.changePassForm);
    }

    ngOnInit() {
        this.sessionDetails = this.authService.isAuthenticated();
        if (this.sessionDetails.role.name === 'Administrator') {
            this.isAdmin = true;
        }
        this.ngProgress.start();
        this.getMemberDetails();
    }

    openChangePassForm(changePasswordModal) {
        this.ngbModal.open(changePasswordModal, { centered: true }).result.then((result) => {
        }, (reason) => {
            this.changePasswordForm.reset();
        });
    }

    checkForDataValidation(data) {
        const validityJson = {
            _isValid: true,
            _errorMessage: '',
        };
        if (data) {
            Object.keys(data).forEach((key) => {
                if (!data[key] && !validityJson._errorMessage && validityJson._isValid) {
                    validityJson['_errorMessage'] = key.replace('_', ' ') + ' Required';
                    validityJson['_isValid'] = false;
                }
            });
        }
        return validityJson;
    }

    changePass() {
        const passwordData = this.changePasswordForm.value;
        if (this.sessionDetails.role.name === 'Administrator') {
            delete passwordData.old_password;
        }
        const getValidationSuccess = this.checkForDataValidation(passwordData);
        if (getValidationSuccess._isValid) {
            this.adminService.changePassword(this.sessionDetails.id, passwordData).subscribe((success: any) => {
                this.changePasswordForm.reset();
                this.authService.logout();
                this.router.navigate(['/welcome']);
            }, (error) => {
                console.log(error);
                alertFunctions.errorPopup(
                    'Change Password Error',
                    error.error.message,
                    'Ok',
                ).then(result => {
                });
            });
        } else {
            alertFunctions.errorPopup(
                'Change Password Error',
                getValidationSuccess._errorMessage,
                'Ok',
            ).then(result => {
            });
        }
    }

    onFileChange(event, content) {
        this.ngbModal.open(content, { centered: true }).result.then((result) => {
            this.previewImage = this.croppedImage;
            const base64Image = encodeURIComponent(this.previewImage);
            this.userForm.controls['image'].setValue(base64Image);
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
            'Image Error',
            'Only jpeg, png, jpg Images Allowded',
            'Ok',
        ).then(result => {
        });
    }

    getMemberDetails() {
        this.isEdit = false;
        const formControls = this.userForm.controls;
        this.adminService.getMemberDetails(this.sessionDetails.id).subscribe((success: any) => {
            this.ngProgress.done();
            this.sessionDetails = success;
            this.adminService.getMember.next(success);
            this.previewImage =
                (this.sessionDetails.image) ? AppConstants.BASE_URL + '/' + this.sessionDetails.image : 'assets/images/user-default.png';
            this.fullName = success.first_name + ' ' + success.last_name;
            this.description = success.job_description;
            Object.keys(this.userFormDefaults).forEach((k) => {
                formControls[k].setValue(this.sessionDetails[k]);
            });
            formControls['currentImage'].setValue(this.previewImage);
            this.isEdit = false;
        }, (error) => {
            console.log(error);
        });
    }

    submitForm() {
        const memberData = this.userForm.getRawValue();
        const getValidationSuccess = this.checkForDataValidation(memberData);

        if (getValidationSuccess._isValid) {
            memberData.roleId = this.sessionDetails.role.id;
            this.adminService.updateMemberDetails(this.sessionDetails.id, memberData).subscribe((success: any) => {
                this.getMemberDetails();
            }, (error) => {
                console.log(error);
                alertFunctions.errorPopup(
                    'Update Member Profile Error',
                    error.error.message,
                    'Ok',
                ).then(result => {
                });
            });
        } else {
            alertFunctions.errorPopup(
                'Update Member Profile Error',
                getValidationSuccess._errorMessage,
                'Ok',
            ).then(result => {
            });
        }
    }
}
