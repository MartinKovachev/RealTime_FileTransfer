import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { FilesTransferService } from '../services/files-transfer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  files: any = [];
  hubConnection: any;

  constructor(private router: Router, private filesTransferService: FilesTransferService, private toastr: ToastrService) { }

  ngOnInit() {
    this.hubConnection = new HubConnectionBuilder() // Connect to the hub
      .withUrl('/shareFile')
      .build();

    this.hubConnection.start() // Start the connection
      .then(() => { console.log("Connection started"); })
      .catch(err => { console.log(err); });

    this.hubConnection.on('Notify', (data) => { // Function called from the server
      let found: boolean = false;

      this.files.forEach((file) => { // Check if the new file is contained in files array
        if (file.id == data.id) {
          found = true;
          return;
        }
      });

      if (!found) { // If the file was not found in files array, add it
        this.files.push(data);
        this.showSuccessNotification('Име на файла: ' + data.name, 'Получен е нов файл!');
        this.playAudio();
      }
    });
  }

  ngOnDestroy() {
    this.hubConnection.stop() // Stop the connection
      .then(() => { console.log("Connection stoped"); });
  }

  showSuccessNotification(message: string, title: string) {
    this.toastr.success(message, title);
  }

  redirectToUploadComponent() {
    this.router.navigate(['/login']);
  }

  downloadFile(fileId: string) {
    this.filesTransferService.downloadFile(fileId).subscribe(data => {
      this.downloadData(data);
    },
      error => console.log('Error downloading the file'),
      () => console.info('OK')
    );
  }

  downloadData(data: any) { // Use to download any type of file
    const element = document.createElement('a');
    element.href = window.URL.createObjectURL(data.file);
    element.download = decodeURI(data.filename.split(';')[1].trim().split('=')[1]);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  playAudio() {
    let audio = new Audio();
    audio.src = "/resources/320655__rhodesmas__level-up-01.wav";
    audio.load();
    audio.play();
  }

}
