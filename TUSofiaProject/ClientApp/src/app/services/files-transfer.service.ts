import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class FilesTransferService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  upload(formData) {
    return this.httpClient.post('/api/upload/import', formData as FormData);
  }

  delete(fileId) {
    return this.httpClient.delete('/api/upload/delete/' + fileId);
  }

  getUploadedFiles() {
    return this.httpClient.get('/api/upload/getUploadedFiles');
  }

  downloadFile(fileId) {
    return this.httpClient.post('/api/dashboard/downloadFile', fileId, { observe: 'response', responseType: 'blob' }).pipe(map(res => {
      let data = {
        file: new Blob([res.body], { type: res.headers.get('Content-Type') }),
        filename: res.headers.get('Content-Disposition')
      }
      return data;
    }));
  }

  login(user) {
    return this.httpClient.post('/api/login', user).pipe(
      map((response: any) => {
        let user = response;
        if (user) {
          var now = new Date();
          now.setHours(now.getHours() + 1);
          this.cookieService.set('token', user.token, now);
        }
      })
    );
  }

  logout() {
    // remove the token from Cookies
    console.log("Logged out");
    this.cookieService.delete('token');
  }
}
