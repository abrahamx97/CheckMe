import { Component } from '@angular/core';
import { IonicPage, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { FileChooserPage } from '../file-chooser/file-chooser'

import { FileChooserProvider } from '../../providers/file-chooser/file-chooser'
import { GroupsProvider } from '../../providers/groups/groups'
import { DegreesProvider } from '../../providers/degrees/degrees'


@IonicPage()
@Component({
    selector: 'page-import',
    templateUrl: 'import.html',
})
export class ImportPage {

    students: Array<any> = new Array<string>()
    degrees: Array<{}> = new Array<{}>()
    fileDescriptor: any = null
    degree_id: any

    private headers: Array<any> = new Array<string>()
    constructor(public modalCtrl: ModalController, private fileChooserProvider: FileChooserProvider, private toastCtrl: ToastController, private groupsProvider: GroupsProvider, private loadingCtrl: LoadingController, private degreesProvider: DegreesProvider) {
        this.degreesProvider.all().then(degrees => {
            let degreesData = new Array<{}>()
            for (let i = 0; i < degrees.rows.length; i++) {
                degreesData.push(degrees.rows.item(i))
            }

            this.degrees = degreesData
        }).catch(error => {

        })
    }

    ionViewDidLoad() {

    }

    loadCsvFile() {
        let modal = this.modalCtrl.create(FileChooserPage)
        modal.onDidDismiss(fileDescriptor => {
            if (fileDescriptor) {
                let loading = this.createLoading()
                loading.present()
                this.fileChooserProvider.parseToArray(fileDescriptor, true).then(result => {
                    this.students = result.students
                    this.headers = result.headers
                    loading.dismiss()
                }).catch(error => {
                    loading.dismiss()
                    this.parsingErrorHandler()
                })

            }
        })
        modal.present()
    }

    saveStudents(form) {
        let values = form.value
        this.groupsProvider.saveStudentsGroup(this.students, values.degree_id, values.name, false, this.headers).then(result => {
            if (result.rowsAffected > 0) {
                this.saveStundentsSuccessHandler()
            } else {
                this.saveStundentsErrorHandler()
            }
        }).catch(error => {
            this.saveStundentsErrorHandler()
        })
    }

    private saveStundentsErrorHandler() {
        let toast = this.toastCtrl.create({
            message: 'No se pudo guardar el grupo.',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 3500
        })

        toast.present()
    }

    private saveStundentsSuccessHandler() {
        let toast = this.toastCtrl.create({
            message: 'Grupo guardado.',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 3500
        })

        toast.present()
    }

    private parsingErrorHandler() {
        let toast = this.toastCtrl.create({
            message: 'No se pudo leer archivo, verifique su contenido.',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 4500
        })

        toast.present()
    }

    private createLoading() {
        return this.loadingCtrl.create({
            content: 'Procesando...',
            spinner: 'bubbles'
        })
    }

}
