import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { FileModel } from 'src/app/layout/general-configuration/general-configuration/general-configuration.model';
 
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor() { }
  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();
  profilePicPath: any;
  defaultProfilePic = 'assets/images/profile/default-profile-pic.png';
  fileModel: FileModel;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
  };
  public errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  public ngOnInit(): void {
    this.toggleWebcam();
  }

  public triggerSnapshot(): void {

    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = true;
  }

  public remove(): void {
    this.showWebcam = !this.showWebcam;

    setTimeout(() => {
      this.showWebcam = true;
    }, 70);
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.pictureTaken.emit(webcamImage);
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

}
