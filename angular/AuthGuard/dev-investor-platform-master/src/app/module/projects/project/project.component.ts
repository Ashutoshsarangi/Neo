import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { AppConstants } from '../../../config/constants';
import { AuthService } from '../../../shared/auth/auth.service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
// import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    @ViewChild('fileInput') fileInput: ElementRef;

    public projectDetails: any = {};
    public memberCount: number;
    public resourceArray: Array<any>;
    public managementArray: Array<any>;
    public reportCount: number;
    public generalInfo: boolean;
    public memberEdit: boolean;
    public session: any;
    durationArray: any = [];
    edit: boolean;
    oldImage: string;
    public baseUrl = AppConstants.BASE_URL;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    model: NgbDateStruct;
    projGenInfoForm: FormGroup;

    public projGenInfo: any = {
        'name': [''],
        'start_date': [''],
        'duration': [''],
        'image': [''],
        'tempImage': [''],
        'members': ['']
    };

    // @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
    // imageChangedEvent: any;
    // showCropper = false;
    // croppedImage: any = '';

    public view: boolean;

    public projectsIconArray: Array<any>;

    constructor(private adminService: AdminService,
        // private calendar: NgbCalendar,
        private formBuilder: FormBuilder,
        private ngbModal: NgbModal,
        private router: ActivatedRoute,
        private authService: AuthService,
        private ngProgress: NgProgress) {
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: false,
            enableCheckAll: false,
            text: 'Select Investor',
            selectAllText: 'Select Investor',
            enableSearchFilter: true,
            classes: 'myclass custom-class form-control multi-dropdown',
            showCheckbox: false,
        };
        this.projGenInfoForm = this.formBuilder.group(this.projGenInfo);
    }

    ngOnInit() {
        this.generalInfo = false;
        this.managementArray = this.projectsIconArray = [];
        this.resourceArray = [];
        this.view = false;
        this.session = this.authService.isAuthenticated();
        this.durationArray = ['1 Month'];
        for (let i = 2; i <= 36; i++) {
            this.durationArray.push(i + ' Months');
        }

        this.model = {
            year: new Date().getFullYear(),
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        };

        this.projGenInfoForm.controls['start_date'].setValue(this.model);
        this.ngProgress.start();
        this.getAllMembers();
        // this.getAllProjects();

        this.router.params.subscribe((params: any) => {
            if (params.id) {
                this.getProjectDetails(params.id);
                this.getMemberCount(params.id);
                this.getProjectReports(params.id);
                this.view = true;
            } else {
                this.view = false;
                this.adminService.setSidebarActiveTab.next('dashboard');
            }
        });
    }

    // onItemSelect(item: any) {
    //     console.log(item);
    // }
    // onItemDeSelect(item: any) {
    //     console.log(this.selectedItems);
    // }

    // onDateSelect(event: NgbDateStruct) {
    //     this.projGenInfoForm.controls['start_date'].setValue(this.model);
    // }

    getAllMembers() {
        this.adminService.getAllMembers().subscribe((members: any) => {
            members.forEach((eachMember: any) => {
                if (eachMember.role.name === 'Investor') {
                    const json = {
                        id: eachMember.id,
                        image: this.baseUrl + '/' + eachMember.image,
                        itemName: eachMember.first_name + ' ' + eachMember.last_name,
                        role: eachMember.role.name
                    };
                    this.dropdownList.push(json);
                }
            });
        }, (error) => {
            console.log(error);
        });
    }

    // getAllProjects() {
    //     this.adminService.getAllProjects().subscribe((success: any) => {
    //         this.ngProgress.done();
    //         const data = success;
    //         this.adminService.getProjects.next(success);
    //         if (!data.message) {
    //             data.forEach((eachData) => {
    //                 const json = {
    //                     image: this.baseUrl + '/' + eachData.image,
    //                     name: eachData.name
    //                 };
    //                 this.projectsIconArray.push(json);
    //             });
    //         }
    //     }, (error) => {

    //     });
    // }

    // validateData(projGenInfo) {
    //     let _isValid = true;
    //     let _field = '';
    //     Object.keys(projGenInfo).forEach((eachKey) => {
    //         if (!projGenInfo[eachKey] && !_field && _isValid) {
    //             _isValid = false;
    //             _field = eachKey;
    //         }
    //     });
    //     return { _isValid, _field };
    // }

    // onFileChange(event, content) {
    //     this.oldImage = (this.projGenInfoForm.value.tempImage) ? this.projGenInfoForm.value.tempImage : '';
    //     const tempName = event.target.files[0].name;
    //     this.ngbModal.open(content, { centered: true }).result.then((result) => {
    //         const previewImage = this.croppedImage;
    //         const base64Image = encodeURIComponent(previewImage);
    //         this.projGenInfoForm.controls['image'].setValue(base64Image);
    //         this.projGenInfoForm.controls['tempImage'].setValue(tempName);
    //     }, (reason) => {

    //     });
    //     this.imageChangedEvent = event;
    // }

    // imageCropped(event: ImageCroppedEvent) {
    //     this.croppedImage = event.base64;
    // }

    // imageLoaded() {
    //     this.showCropper = true;
    // }

    // cropperReady() {
    //     console.log('Cropper ready');
    // }

    // loadImageFailed() {
    //     alertFunctions.errorPopup(
    //         'Image Error',
    //         'Only jpeg, png, jpg Images Allowded',
    //         'Ok',
    //     ).then(result => {
    //     });
    // }

    getProjectDetails(id) {
        this.adminService.getProjectById(id).subscribe((project: any) => {
            this.projectDetails = project;
            // console.log('projectDetails => ', this.projectDetails)
            this.adminService.setSidebarActiveTab.next(project.name);
        }, (error) => {
            console.log(error);
        });
    }

    getMemberCount(id) {
        this.adminService.getMembersCount(id).subscribe((members: any) => {
            this.selectedItems = [];
            if (members.message) {
                this.memberCount = 0;
            } else {
                members.forEach((eachMember: any) => {
                    if (eachMember.member_position === 'Investor') {
                        const json = {
                            id: eachMember.member.id,
                            itemName: eachMember.member.first_name + ' ' + eachMember.member.last_name,
                        };
                        this.selectedItems.push(json);
                    }
                });

                const array = ['Administrator', 'CEO', 'CTO', 'Founder', 'Co-Founder'];
                members.forEach(eachMember => {
                    if (array.indexOf(eachMember.member_position) > -1) {
                        this.managementArray.push(eachMember);
                    } else if (eachMember.member_position !== 'Investor') {
                        this.resourceArray.push(eachMember);
                    }
                });
                this.memberCount = this.managementArray.length + this.resourceArray.length;
            }
        }, (error) => {
            console.log(error);
        });
    }

    getProjectReports(id) {
        this.adminService.getProjectReports(id, {}).subscribe((reportCount: any) => {
            if (reportCount.message) {
                this.reportCount = 0;
            } else {
                this.reportCount = reportCount.length;
            }
        }, (error) => {
            console.log(error);
        });
    }

    // addGenInfo() {
    //     const projGenInfo = this.projGenInfoForm.value;
    //     const _validationResult = this.validateData(projGenInfo);
    //     if (
    //         (!_validationResult._isValid &&
    //             _validationResult._field) ||
    //         projGenInfo.members.length === 0) {

    //         const message = _validationResult._field + ' Required' || 'No Investor Selected';
    //         alertFunctions.errorPopup(
    //             'Add Project Error',
    //             message,
    //             'Ok',
    //         ).then(result => {
    //         });
    //     } else {
    //         let start_date = projGenInfo.start_date;
    //         if (typeof (start_date) === 'object') {
    //             start_date.month = ('0' + start_date.month).slice(-2);
    //             start_date.day = ('0' + start_date.day).slice(-2);
    //             start_date = start_date.year + '-' + start_date.month + '-' + start_date.day;
    //         }
    //         projGenInfo.start_date = start_date;
    //         projGenInfo.members = JSON.stringify(projGenInfo.members);
    //         this.adminService.addProject(projGenInfo).subscribe((success: any) => {
    //             // console.log('Success => ', success);
    //             this.projGenInfoForm.reset();
    //             this.view = true;
    //             this.adminService.setSidebarActiveTab.next(success.name);
    //             this.getAllProjects();
    //             this.getProjectDetails(success.id);
    //             this.getMemberCount(success.id);
    //             this.getProjectReports(success.id);
    //         }, (error) => {
    //             console.log(error);
    //         });
    //     }
    // }

    // setImageName(value, path) {
    //     this.projGenInfoForm.controls['tempImage'].setValue(value);
    //     this.projGenInfoForm.controls['image'].setValue(path);
    // }

    // editGenInfo() {
    //     this.edit = true;
    //     this.view = false;
    //     this.oldImage = this.projectDetails.image;
    //     this.getMemberCount(this.projectDetails.id);
    //     this.projGenInfoForm.controls['name'].setValue(this.projectDetails.name);
    //     this.projGenInfoForm.controls['duration'].setValue(this.projectDetails.duration);
    //     this.projGenInfoForm.controls['image'].setValue(this.projectDetails.image);
    //     this.projGenInfoForm.controls['tempImage'].setValue(this.projectDetails.image);
    //     this.model = {
    //         year: new Date(this.projectDetails.start_date).getFullYear(),
    //         day: new Date(this.projectDetails.start_date).getDate(),
    //         month: new Date(this.projectDetails.start_date).getMonth() + 1
    //     };
    //     this.projGenInfoForm.controls['start_date'].setValue(this.model);
    // }

    // updateGenInfo(id) {
    //     const projGenInfo = this.projGenInfoForm.value;
    //     const _validationResult = this.validateData(projGenInfo);

    //     if (
    //         (!_validationResult._isValid &&
    //             _validationResult._field) ||
    //         projGenInfo.members.length === 0) {

    //         const message = _validationResult._field + ' Required' || 'No Investor Selected';
    //         alertFunctions.errorPopup(
    //             'Add Project Error',
    //             message,
    //             'Ok',
    //         ).then(result => {
    //         });
    //     } else {
    //         let start_date = projGenInfo.start_date;
    //         if (typeof (start_date) === 'object') {
    //             start_date.month = ('0' + start_date.month).slice(-2);
    //             start_date.day = ('0' + start_date.day).slice(-2);
    //             start_date = start_date.year + '-' + start_date.month + '-' + start_date.day;
    //         }
    //         projGenInfo.start_date = start_date;
    //         projGenInfo.members = JSON.stringify(projGenInfo.members);
    //         projGenInfo.oldImage = this.oldImage;
    //         this.adminService.updateProject(id, projGenInfo).subscribe((success: any) => {
    //             // console.log('Success => ', success);
    //             this.projGenInfoForm.reset();
    //             this.view = true;
    //             this.getAllProjects();
    //             this.getProjectDetails(id);
    //             this.getMemberCount(id);
    //         }, (error) => {
    //             console.log(error);
    //         });
    //     }
    // }
}
