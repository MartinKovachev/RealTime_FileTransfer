import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FilesTransferService } from '../services/files-transfer.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { error } from 'util';
import { Router } from '@angular/router';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('file') inputFile: ElementRef;
  inputFileName: string;
  file: File;
  files: any = null;
  formData = new FormData();
  hubConnection: any;
  uploadLoader: boolean = false;
  initialLoader: boolean = true;

  constructor(private filesTransferService: FilesTransferService, private router: Router, private toastr: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    const token = this.cookieService.get('token');

    if (token) { // If the user is not logged in, redirect to /login page
      this.hubConnection = new HubConnectionBuilder() // Connect to the hub
        .withUrl('/shareFile')
        .build();

      this.hubConnection.start() // Start the connection
        .then(() => { console.log("Connection started"); })
        .catch(err => { console.log(err); });

      this.filesTransferService.getUploadedFiles().subscribe(data => {
        this.initialLoader = false; // Stop the initial loader
        this.files = data
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  showInfoNotification(message: string, title: string) {
    this.toastr.info(message, title);
  }

  fileToUpload() {
    const nativeElement: HTMLInputElement = this.inputFile.nativeElement;
    if (typeof (nativeElement.files[0]) !== 'undefined') {
      this.file = <File>nativeElement.files[0];
      this.inputFileName = nativeElement.files[0].name;
    } else {
      this.file = null;
      this.inputFileName = '';
    }
  }

  // Upload file to the server
  async uploadFile() {
    if (this.file != null) {
      this.uploadLoader = true; // Start the uploadLoader on uploading
      this.formData.set('file', this.file, this.inputFileName);

      this.filesTransferService.upload(this.formData).subscribe(() => {
        this.uploadLoader = false; // Stop the uploadLoader when uploaded
        this.filesTransferService.getUploadedFiles().subscribe(data => this.files = data);
      }, error => {
        this.uploadLoader = false;
        console.log(error);
      }
      );

      this.file = null;
      this.inputFileName = '';
      this.inputFile.nativeElement.value = '';
    }
  }

  redirectToDashboardComponent() {
    this.router.navigate(['/home']);
  }

  shareFile(file: any) {
    this.hubConnection.invoke('ShareFile', file);
    this.showInfoNotification('Файл: ' + file.name + ' е споделен успешно!', 'Споделен е нов файл!');
  }

  deleteFile(file: any) {
    this.filesTransferService.delete(file.id).subscribe(() =>
      this.filesTransferService.getUploadedFiles().subscribe(data => this.files = data)
    );
  }

  logout() {
    this.filesTransferService.logout();
    this.router.navigate(['/login']);
  }
}
