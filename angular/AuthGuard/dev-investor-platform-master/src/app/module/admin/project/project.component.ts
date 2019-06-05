import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AppConstants } from '../../../config/constants';
import { AuthService } from '../../../shared/auth/auth.service';
import { NgbDateStruct, NgbCalendar, NgbInputDatepicker, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { NgProgress } from 'ngx-progressbar';
import { PaginationService } from '../../../shared/pagination/pagination.service';
import { saveAs } from 'file-saver';
import * as $ from 'jquery';

// Range datepicker Start
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;
// Range datepicker Ends

declare var $: any;

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
    @ViewChild('dp') private datePicker: NgbInputDatepicker;

    public projectDetails: any = {};
    public memberCount: number;
    public reportCount: number;
    public generalInfo: boolean;
    public memberEdit: boolean;
    public session: any;
    public reports: any;
    selectedDateRange: any;
    durationArray: any = [];
    edit: boolean;
    isVisible: boolean;
    oldImage: string;
    public baseUrl = AppConstants.BASE_URL;
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    reportId: Number;
    model: NgbDateStruct;
    fromDateModel: NgbDateStruct;
    toDateModel: NgbDateStruct;
    projGenInfoForm: FormGroup;
    reportForm: FormGroup;
    dateRange: boolean;
    searchValue: boolean;
    editMemberList: boolean;
    enableEdit: boolean;
    disableUpdate: boolean;
    isAdd: boolean;
    file: string;
    allProjectMembers: any = [];
    allMembers: any = [];
    filterMembers: any = [];
    memberList: any = {};
    selectedMembers: any = [];
    memberPosKeys: any = [];
    memPosition: any = [];
    iconImage: string;
    projectName: string;
    fileData: any = [];
    folderData: any = [];
    folders: any = [];
    fileNames: any = [];
    folderName: string;
    selectedFolder: string;
    assetsMessage: string;
    new: boolean;
    newFolder: boolean;
    newFile: boolean;
    editAsset: boolean;

    public projGenInfo: any = {
        'name': [''],
        'start_date': [''],
        'duration': [''],
        'image': [''],
        'tempImage': [''],
        'members': ['']
    };

    public reportInfo: any = {
        'name': [''],
        'from_date': [''],
        'to_date': [''],
        'short_description': [''],
        'file': [''],
        'size': [''],
        'filename': [''],
        'oldImage': ['']
    };

    imageChangedEvent: any;
    showCropper = false;
    isOpen = false;
    croppedImage: any = '';

    pager: any = {};
    reportsItem: any;

    public view: boolean;
    public projectsIconArray: Array<any>;

    hoveredDate: NgbDateStruct;
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;

    @HostListener('document:click', ['$event.target']) onClick(element) {
        const host = document.getElementById('dateRangePicker');
        if (this.datePicker && this.isOpen && !this.isDescendant(host, element)) {
            this.emit(true);
        }
    }

    constructor(private adminService: AdminService,
        private formBuilder: FormBuilder,
        private ngbModal: NgbModal,
        private router: ActivatedRoute,
        private navRoute: Router,
        private paginationService: PaginationService,
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
        this.reportForm = this.formBuilder.group(this.reportInfo);
    }

    ngOnInit() {
        this.generalInfo = this.dateRange = this.isAdd = this.isVisible = false;
        this.projectsIconArray = [];
        this.view = false;
        this.session = this.authService.isAuthenticated();
        this.durationArray = ['1 Month'];
        for (let i = 2; i <= 36; i++) {
            this.durationArray.push(i + ' Months');
        }

        this.model = this.fromDateModel = this.toDateModel = {
            year: new Date().getFullYear(),
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        };

        this.projGenInfoForm.controls['start_date'].setValue(this.model);
        this.ngProgress.start();
        this.getAllMembers();
        this.getAllProjects();

        this.router.params.subscribe((params: any) => {
            if (params.id) {
                this.getProjectDetails(params.id);
                // this.getMemberCount(params.id);
                this.getAllMembers();
                // this.getProjectReports(params.id, {});
                // this.getAssetData(params.id, true);
                this.editAsset = false;
                this.close();
                this.view = true;
                this.dateRange = false;
                this.editMemberList = false;
                this.selectedDateRange = '';
            } else {
                this.view = false;
                this.adminService.setSidebarActiveTab.next('dashboard');
            }
        });
    }

    onItemSelect(item: any) {
        item.show = true;
    }
    onItemDeSelect(item: any) {
        item.show = false;
        console.log(this.selectedItems);
    }

    onDateSelect(event: NgbDateStruct) {
        this.projGenInfoForm.controls['start_date'].setValue(this.model);
    }

    private isDescendant(parent, child) {
        let node = child;
        while (node !== null) {
            if (node === parent) {
                return true;
            } else {
                node = node.parentNode;
            }
        }
        return false;
    }

    private emit(close?: boolean) {
        if (close) {
            this.isOpen = false;
            this.datePicker.close();
        } else {
            this.isOpen = true;
        }
    }

    isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.fromDate) && before(date, this.toDate);
    isFrom = date => equals(date, this.fromDate);
    isTo = date => equals(date, this.toDate);

    // Range datepicker starts
    onDateSelection(date: NgbDateStruct) {

        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
            const start_date = date.day + '.' + date.month + '.' + date.year;
            this.selectedDateRange = start_date;

        } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
            this.emit(true);
            let start_date: any = this.fromDate;
            start_date.month = ('0' + start_date.month).slice(-2);
            start_date.day = ('0' + start_date.day).slice(-2);
            const from_date = start_date.year + '-' + start_date.month + '-' + start_date.day;
            start_date = start_date.day + '.' + start_date.month + '.' + start_date.year;

            let to_date: any = this.toDate;

            to_date.month = ('0' + to_date.month).slice(-2);
            to_date.day = ('0' + to_date.day).slice(-2);
            const end_date = to_date.year + '-' + to_date.month + '-' + to_date.day;
            to_date = to_date.day + '.' + to_date.month + '.' + to_date.year;
            this.selectedDateRange = start_date + '-' + to_date;

            this.getProjectReports(this.projectDetails.id, { from_date, end_date });
        } else {
            this.toDate = null;
            this.fromDate = date;

            const start_date = date.day + '.' + date.month + '.' + date.year;
            this.selectedDateRange = start_date;
        }
    }

    getAllMembers() {
        this.adminService.getAllMembers().subscribe((members: any) => {
            this.allMembers = this.filterMembers = [];
            this.dropdownList = [];
            const mebersIds: any = [];
            members.forEach((eachMember: any) => {
                if (eachMember.role.name === 'Investor') {
                    const json = {
                        id: eachMember.id,
                        image: (eachMember.image) ? this.baseUrl + '/' + eachMember.image : 'assets/images/user-default.png',
                        itemName: eachMember.first_name + ' ' + eachMember.last_name,
                        role: eachMember.role.name,
                        show: false,
                    };
                    this.dropdownList.push(json);
                    mebersIds.push(eachMember.id);
                } else {
                    this.allMembers.push(eachMember);
                }
            });
            this.selectedItems.forEach((eachItem) => {
                if (mebersIds.indexOf(eachItem.id) > -1) {
                    this.dropdownList[mebersIds.indexOf(eachItem.id)].show = true;
                }
            });
            this.filterMembers = this.allMembers;
        }, (error) => {
            console.log(error);
        });
    }

    getAllProjects() {
        this.adminService.getAllProjects().subscribe((success: any) => {
            this.ngProgress.done();
            this.projectsIconArray = [];
            const data = success;
            this.adminService.getProjects.next(success);
            if (!data.message) {
                data.forEach((eachData) => {
                    const json = {
                        image: this.baseUrl + '/' + eachData.image,
                        name: eachData.name
                    };
                    this.projectsIconArray.push(json);
                });
            }
        }, (error) => {

        });
    }

    validateData(projGenInfo) {
        let _isValid = true;
        let _field = '';
        Object.keys(projGenInfo).forEach((eachKey) => {
            if (!projGenInfo[eachKey] && !_field && _isValid) {
                _isValid = false;
                _field = eachKey;
            }
        });
        return { _isValid, _field };
    }

    onFileChange(event, content) {
        this.oldImage = (this.projGenInfoForm.value.tempImage) ? this.projGenInfoForm.value.tempImage : '';
        const tempName = event.target.files[0].name;
        this.ngbModal.open(content, { centered: true }).result.then((result) => {
            const previewImage = this.croppedImage;
            const base64Image = encodeURIComponent(previewImage);
            this.projGenInfoForm.controls['image'].setValue(base64Image);
            this.projGenInfoForm.controls['tempImage'].setValue(tempName);
            // this.iconImage = tempName;
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

    getProjectDetails(id) {
        this.adminService.getProjectById(id).subscribe((project: any) => {
            this.projectDetails = project;
            this.adminService.setSidebarActiveTab.next(project.name);
            this.getMemberCount(id);
            this.getProjectReports(id, {});
            this.getAssetData(id, true);

        }, (err) => {
            alertFunctions.errorPopup(
                'Error in Fetching Project Details',
                err.error.message,
                'Ok',
            ).then(result => {
                if (result.value) {
                    this.navRoute.navigate(['/admin']);
                }
            });
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
                            image:
                                (eachMember.member.image) ? this.baseUrl + '/' + eachMember.member.image : 'assets/images/user-default.png',
                            itemName: eachMember.member.first_name + ' ' + eachMember.member.last_name,
                        };
                        this.selectedItems.push(json);
                    }
                });

                this.memberList = {};
                this.selectedMembers = [];
                this.allProjectMembers = [];
                this.memberPosKeys = [];
                members.forEach(eachMember => {
                    if (eachMember.member_position !== 'Investor') {
                        if (this.memberList.hasOwnProperty(eachMember.member_position)) {
                            this.memberList[eachMember.member_position].push(eachMember);
                        } else {
                            this.memberList[eachMember.member_position] = [eachMember];
                        }
                        this.selectedMembers.push(eachMember);

                        this.allProjectMembers.push(eachMember.member.id);
                    }
                });
                this.memberPosKeys = Object.keys(this.memberList);
                this.memberCount = this.selectedMembers.length;
            }
        }, (error) => {
            console.log(error);
        });
    }

    getProjectReports(id, data) {
        this.adminService.getProjectReports(id, data).subscribe((reports: any) => {
            if (reports.message) {
                this.reportCount = 0;
                this.reports = '';
            } else {
                this.reports = reports;
                this.setPage(1, this.reports);
                this.reportCount = reports.length;
            }
        }, (error) => {
            console.log(error);
        });
    }

    addGenInfo() {
        const projGenInfo = this.projGenInfoForm.value;
        const _validationResult = this.validateData(projGenInfo);
        if (
            (!_validationResult._isValid &&
                _validationResult._field) ||
            projGenInfo.members.length === 0) {

            const message = (_validationResult._field) ? _validationResult._field + ' Required' : 'No Investor Selected';
            alertFunctions.errorPopup(
                'Add Project Error',
                message,
                'Ok',
            ).then(result => {
            });
        } else {
            let start_date = projGenInfo.start_date;
            if (typeof (start_date) === 'object') {
                start_date.month = ('0' + start_date.month).slice(-2);
                start_date.day = ('0' + start_date.day).slice(-2);
                start_date = start_date.year + '-' + start_date.month + '-' + start_date.day;
            }
            projGenInfo.start_date = start_date;
            projGenInfo.members = JSON.stringify(projGenInfo.members);
            this.adminService.addProject(projGenInfo).subscribe((success: any) => {
                this.projGenInfoForm.reset();
                this.view = true;
                this.adminService.setSidebarActiveTab.next(success.name);
                this.getAllProjects();
                this.getProjectDetails(success.id);
                this.getMemberCount(success.id);
                this.getProjectReports(success.id, {});
            }, (error) => {
                console.log(error);
            });
        }
    }

    setImageName(value, path) {
        this.projGenInfoForm.controls['tempImage'].setValue(value);
        this.projGenInfoForm.controls['image'].setValue(path);
        this.iconImage = path;
        this.projectName = value;
    }

    editGenInfo() {
        this.edit = true;
        this.view = false;
        this.oldImage = this.projectDetails.image;
        this.getMemberCount(this.projectDetails.id);
        this.projGenInfoForm.controls['name'].setValue(this.projectDetails.name);
        this.projGenInfoForm.controls['duration'].setValue(this.projectDetails.duration);
        this.projGenInfoForm.controls['image'].setValue(this.projectDetails.image);
        this.projGenInfoForm.controls['tempImage'].setValue(this.projectDetails.image);
        this.iconImage = this.baseUrl + '/' + this.projectDetails.image;
        this.projectName = this.projectDetails.name;
        this.model = {
            year: new Date(this.projectDetails.start_date).getFullYear(),
            day: new Date(this.projectDetails.start_date).getDate(),
            month: new Date(this.projectDetails.start_date).getMonth() + 1
        };
        this.projGenInfoForm.controls['start_date'].setValue(this.model);
    }

    updateGenInfo(id) {
        const projGenInfo = this.projGenInfoForm.value;
        const _validationResult = this.validateData(projGenInfo);

        if (
            (!_validationResult._isValid &&
                _validationResult._field) ||
            projGenInfo.members.length === 0) {

            const message = (_validationResult._field) ? _validationResult._field + ' Required' : 'No Investor Selected';
            alertFunctions.errorPopup(
                'Update Project Error',
                message,
                'Ok',
            ).then(result => {
            });
        } else {
            let start_date = projGenInfo.start_date;
            if (typeof (start_date) === 'object') {
                start_date.month = ('0' + start_date.month).slice(-2);
                start_date.day = ('0' + start_date.day).slice(-2);
                start_date = start_date.year + '-' + start_date.month + '-' + start_date.day;
            }
            projGenInfo.start_date = start_date;
            projGenInfo.members = JSON.stringify(projGenInfo.members);
            projGenInfo.oldImage = this.oldImage;
            this.adminService.updateProject(id, projGenInfo).subscribe((success: any) => {
                this.projGenInfoForm.reset();
                this.view = true;
                this.getAllProjects();
                this.getProjectDetails(id);
                this.getMemberCount(id);
            }, (error) => {
                alertFunctions.errorPopup(
                    'Update Project Error',
                    error.error.message,
                    'Ok',
                ).then(result => {
                });
            });
        }
    }

    setPage(page: number, data) {
        this.pager = this.paginationService.getPager(data.length, page, 5);
        this.reportsItem = data.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    openAddReort() {
        this.reportForm.reset();
        this.isVisible = true;
        this.disableUpdate = true;
        this.fromDateModel = this.toDateModel = {
            year: new Date().getFullYear(),
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        };
        this.reportForm.controls['from_date'].setValue(this.fromDateModel);
        this.reportForm.controls['to_date'].setValue(this.toDateModel);
    }

    submitReport(projectDetails) {
        const reportFormValue = this.reportForm.value;
        delete reportFormValue.oldImage;
        const _validationResult = this.validateData(reportFormValue);
        if (!_validationResult._isValid && _validationResult._field) {
            const message = _validationResult._field + ' Required' || 'No Investor Selected';
            alertFunctions.errorPopup(
                'Add Project Error',
                message,
                'Ok',
            ).then(result => {
            });
        } else {
            let from_date = reportFormValue.from_date;
            if (typeof (from_date) === 'object') {
                from_date.month = ('0' + from_date.month).slice(-2);
                from_date.day = ('0' + from_date.day).slice(-2);
                from_date = from_date.year + '-' + from_date.month + '-' + from_date.day;
            }
            reportFormValue.from_date = from_date;
            let to_date = reportFormValue.to_date;
            if (typeof (to_date) === 'object') {
                to_date.month = ('0' + to_date.month).slice(-2);
                to_date.day = ('0' + to_date.day).slice(-2);
                to_date = to_date.year + '-' + to_date.month + '-' + to_date.day;
            }
            reportFormValue.to_date = to_date;
            reportFormValue.project_id = projectDetails.id;
            reportFormValue.filename = this.reportForm.value.filename;
            reportFormValue.file = encodeURIComponent(this.reportForm.value.file);
            reportFormValue.projectName = projectDetails.name;
            if (reportFormValue.filename.split('.')[1] === 'pdf' || reportFormValue.filename.split('.')[1] === 'PDF') {
                this.adminService.addReport(reportFormValue).subscribe((success: any) => {
                    this.reportForm.reset();
                    this.isVisible = false;
                    this.getProjectReports(projectDetails.id, {});

                }, (error) => {
                    console.log(error);
                });
            } else {
                alertFunctions.errorPopup(
                    'Image Error',
                    'Only PDF file Allowded',
                    'Ok',
                ).then(result => {
                });
            }
        }
    }

    deleteReport(report, proectDetails) {
        const file = report.file.split('/');
        const data = {
            projectName: report.project.name,
            projectId: report.project.id,
            reportName: file[file.length - 1],
        };
        alertFunctions.confirmPopup(
            'Remove Report',
            'Are you sure, you want to remove report',
            'Yes',
            'cancel',
            false
        ).then(result => {
            if (result.value) {
                this.adminService.removeReport(report.id, data).subscribe((success: any) => {
                    this.isVisible = false;
                    this.getProjectReports(proectDetails.id, {});
                }, (error) => {
                    console.log(error);
                });
            }
        });
    }

    editReport(report) {
        // console.log(report);
        const formControls = this.reportForm.controls;
        Object.keys(this.reportInfo).forEach((k) => {
            formControls[k].setValue(report[k]);
        });
        this.isVisible = true;
        this.disableUpdate = false;
        this.reportId = report.id;
        this.fromDateModel = {
            year: new Date(report.from_date).getFullYear(),
            day: new Date(report.from_date).getDate(),
            month: new Date(report.from_date).getMonth() + 1
        };
        formControls['from_date'].setValue(this.fromDateModel);
        this.toDateModel = {
            year: new Date(report.to_date).getFullYear(),
            day: new Date(report.to_date).getDate(),
            month: new Date(report.to_date).getMonth() + 1
        };
        formControls['to_date'].setValue(this.toDateModel);
        const filename = report.file.split('/');
        this.file = filename[filename.length - 1];
        formControls['filename'].setValue(filename[filename.length - 1]);
        formControls['oldImage'].setValue(filename[filename.length - 1]);
    }

    updateReport(id, project_id) {
        const reportFormValue = this.reportForm.value;
        const _validationResult = this.validateData(reportFormValue);
        if (!_validationResult._isValid && _validationResult._field) {
            const message = _validationResult._field + ' Required' || 'No Investor Selected';
            alertFunctions.errorPopup(
                'Add Project Error',
                message,
                'Ok',
            ).then(result => {
            });
        } else {
            let from_date = reportFormValue.from_date;
            if (typeof (from_date) === 'object') {
                from_date.month = ('0' + from_date.month).slice(-2);
                from_date.day = ('0' + from_date.day).slice(-2);
                from_date = from_date.year + '-' + from_date.month + '-' + from_date.day;
            }
            reportFormValue.from_date = from_date;
            let to_date = reportFormValue.to_date;
            if (typeof (to_date) === 'object') {
                to_date.month = ('0' + to_date.month).slice(-2);
                to_date.day = ('0' + to_date.day).slice(-2);
                to_date = to_date.year + '-' + to_date.month + '-' + to_date.day;
            }
            reportFormValue.to_date = to_date;
            reportFormValue.project_id = project_id;
            reportFormValue.filename = this.reportForm.value.filename;
            reportFormValue.file = encodeURIComponent(this.reportForm.value.file);
            reportFormValue.oldImage = this.reportForm.value.oldImage;
            if (reportFormValue.filename.split('.')[1] === 'pdf' || reportFormValue.filename.split('.')[1] === 'PDF') {
                this.adminService.updateReport(id, reportFormValue).subscribe((success: any) => {
                    this.reportForm.reset();
                    this.isVisible = false;
                    this.getProjectReports(project_id, {});
                }, (error) => {
                    console.log(error);
                });
            } else {
                alertFunctions.errorPopup(
                    'Image Error',
                    'Only PDF file Allowded',
                    'Ok',
                ).then(result => {
                });
            }
        }
    }

    onReportFileChange(event) {
        // console.log('Event => ', event);
        const reader = new FileReader();
        if (event.target.files.length > 0) {
            this.file = event.target.files[0].name;
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                this.reportForm.patchValue({
                    file: reader.result
                });
            };
            this.reportForm.controls['filename'].setValue(event.target.files[0].name);
            let { size } = event.target.files[0];
            const sizeArray = ['KB', 'MB', 'GB'];
            let unit = '';
            let i = 0;
            for (; size > 1024; i++) {
                size = size / 1024;
            }
            unit = (i > 0) ? sizeArray[0] : sizeArray[i - 1];
            size = parseFloat(size).toFixed(2) + ' ' + unit;
            this.reportForm.controls['size'].setValue(size);
        }
    }

    downloadReport(id, file) {
        file = file.split('/');
        this.adminService.downloadReport(id).subscribe((success: any) => {
            saveAs(success, file[file.length - 1]);
        }, (error) => {
            console.log(error);
        });
    }

    addMemToProject(member, projectDetails) {
        console.log(projectDetails);
        if (this.memPosition[member.id]) {
            const data = {
                member_id: member.id,
                project_id: projectDetails.id,
                member_position: this.memPosition[member.id].toLowerCase(),
                full_name: member.first_name + ' ' + member.last_name,
                project_name: projectDetails.name
            };
            this.adminService.addProjectMember(data).subscribe((success: any) => {
                this.memPosition[member.id] = '';
                this.getMemberCount(projectDetails.id);
            }, (err) => {
                console.log(err);
            });
        } else {
            alertFunctions.errorPopup(
                'Add Project Member Error',
                'Please Add Member Position',
                'Ok',
            ).then(result => {
            });
        }
    }

    removeMemberFromProject(member, project_id) {
        const data = {
            project_name: member.project.name,
            project_id: member.project.id,
            member_name: member.member.first_name + ' ' + member.member.last_name,
        };
        alertFunctions.confirmPopup(
            'Remove Member',
            'Are you sure, you want to remove member',
            'Yes',
            'cancel',
            false
        ).then(result => {
            if (result.value) {
                this.adminService.removeProjectmember(member.id, data).subscribe((success: any) => {
                    this.getMemberCount(project_id);
                }, (err) => {
                    console.log(err);
                });
            }
        });
    }

    onKey(event) {
        if (event.target.value) {
            this.searchValue = true;
            this.filterMembers = this.allMembers.filter(val =>
                val.first_name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ||
                val.last_name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
            );
        } else {
            this.searchValue = false;
        }
    }

    closeFix(event, dialog) {
        if (event.target.offsetParent == null) {
            dialog.close();
        } else if (event.target.offsetParent.nodeName !== 'NGB-DATEPICKER') {
            dialog.close();
        }
    }

    getAssetData(id, flag) {
        this.adminService.getDirData(id).subscribe((success: any) => {
            this.assetsMessage = '';
            this.fileData = success.file;
            this.folderData = success.folder;
            this.folders = Object.keys(success.folder);
            this.selectedFolder = (this.folders.length > 0) ? this.folders[0] : '';
            if (flag) {
                setTimeout(() => {
                    $('#treeview').treeviewd({ openedClass: 'icon-Asset-icon2', closedClass: 'icon-Asset-icon1' });
                }, 1000);
            } else {
                $('#treeview').treeviewd({ openedClass: 'icon-Asset-icon2', closedClass: 'icon-Asset-icon1' });
            }
        }, (err) => {
            console.log(err)
        });
    }

    deleteFile(fileObject, index, projectDetails) {
        const path = fileObject.path;
        const projectName = projectDetails.name;
        this.adminService.removeFile({ path, projectName }).subscribe((success: any) => {
            if (fileObject.isFolder) {
                this.folderData[fileObject.folder].splice(index, 1);
            } else {
                this.fileData.splice(index, 1);
            }
        }, (err) => {
            alertFunctions.errorPopup(
                'Delete File Error',
                err.error.message,
                'Ok',
            ).then(result => {
            });
        });
    }

    createFolder(id) {
        if (this.folderName) {
            this.adminService.createFolder({ folder: this.folderName }, id).subscribe((success: any) => {
                this.new = this.newFolder = false;
                this.folderName = '';
                this.getAssetData(id, false);
            }, (err) => {
                this.folderName = '';
                if (err.error.message) {
                    alertFunctions.errorPopup(
                        'Create Folder Error',
                        err.error.message,
                        'Ok',
                    ).then(result => {
                    });
                }
            });
        } else {
            alertFunctions.errorPopup(
                'Create Folder Error',
                'Folder Name Required',
                'Ok',
            ).then(result => {
            });
        }
    }

    onMultiFileChange(event, id) {
        const selectedFiles = event.target.files;

        if (Object.keys(selectedFiles).length > 3) {
            alertFunctions.errorPopup(
                'Upload Assets File Error',
                'Maximum 3 Files Allowed',
                'Ok',
            ).then(result => {

            });
            return;
        }

        Object.keys(selectedFiles).forEach((eachFile) => {
            const fileData = selectedFiles[eachFile];
            if (fileData.type === 'image/jpeg' || fileData.type === 'image/png') {
                const reader = new FileReader();
                reader.readAsBinaryString(fileData);
                reader.onload = (readerEvt: any) => {
                    const base64 = btoa(readerEvt.target.result);
                    const json = {
                        name: fileData.name,
                        format: encodeURIComponent(base64)
                    };
                    this.fileNames.push(json);
                };
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(fileData);
                reader.onload = () => {
                    let base64: any = reader.result;
                    base64 = base64.replace('data:application/pdf;base64,', '');
                    const json = {
                        name: fileData.name,
                        format: encodeURIComponent(base64)
                    };
                    this.fileNames.push(json);
                };
            }
        });

    }

    uploadAssets(projectDetails) {
        if (this.selectedFolder) {
            if (this.fileNames.length > 0) {
                const dataObj = { data: JSON.stringify(this.fileNames), folder: this.selectedFolder, projectName: projectDetails.name };
                this.adminService.uploadAssetsFiles(dataObj, projectDetails.id).subscribe((success: any) => {
                    this.fileNames = [];
                    this.selectedFolder = this.folders[0];
                    this.close();
                });
            }
        } else {
            alertFunctions.errorPopup(
                'Upload Assets Folder Error',
                'Please Add/Select Folder',
                'Ok',
            ).then(result => {

            });
        }
    }

    close() {
        this.selectedFolder = this.folders[0];
        this.new = false;
        this.newFile = false;
        this.newFolder = false;
    }
}
