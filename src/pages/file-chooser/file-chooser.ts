import { Component } from '@angular/core';
import { IonicPage, ToastController, ViewController } from 'ionic-angular';

import { FileChooserProvider } from '../../providers/file-chooser/file-chooser'
import { Entry } from '@ionic-native/file';

@IonicPage()
@Component({
    selector: 'page-file-chooser',
    templateUrl: 'file-chooser.html',
})

/*
 *Alternative to file chooser native plugin 'cause it close application.
 *FileChooser is based on File native plugin, it explore directories and show them in a list
 */
export class FileChooserPage {

    endPoints: Entry[] = null
    urls : Array<string> = new Array<string>()

    private actualURL : string = ''

    constructor(public fileChooser: FileChooserProvider, private toastCtrl : ToastController, private viewCtrl : ViewController) {

        this.fileChooser.listExternalRootDirectory().then(endPoints => {
            this.endPoints = endPoints
            this.actualURL = this.fileChooser.externalRootDirectory
        }).catch(error => {
            this.directoryErrorHandler()
        })
        
    }

    ionViewDidLoad() {
        
    }

    navigate(endPoint : any){
        if(endPoint.isDirectory){
            this.fileChooser.listDirectory(endPoint.nativeURL).then(endPoints =>{
                this.endPoints=endPoints
                this.urls.push(this.actualURL)
                this.actualURL = endPoint.nativeURL
            }).catch(error => {
                this.directoryErrorHandler()
            })
        }else if(endPoint.isFile){
            if(!(<string> endPoint.name).endsWith('.csv')){
                this.incorrectFileHandler()
            }else{
                this.dismiss(endPoint)
            }
        }
    }

    backDirectory(){
        let nativeURL = this.urls.pop();
        this.fileChooser.listDirectory(nativeURL).then(endPoints =>{
            this.endPoints=endPoints
            this.actualURL = nativeURL
        }).catch(error => {
            this.directoryErrorHandler()
        })
    }

    private directoryErrorHandler(){
        let toast = this.toastCtrl.create({
            message: 'Error listando directorio.',
            closeButtonText: 'Ok',
            showCloseButton: true,
            cssClass: 'round',
            position: 'bottom',
            dismissOnPageChange: true
        })

        toast.present()
    }

    private incorrectFileHandler(){
        let toast = this.toastCtrl.create({
            message: 'Formato incorrecto (.csv esperado).',
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'bottom',
            duration: 1000
        })

        toast.present()
    }

    dismiss(fileDescriptor) {
        this.viewCtrl.dismiss(fileDescriptor);
    }

}
