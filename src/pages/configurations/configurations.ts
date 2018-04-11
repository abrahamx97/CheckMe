import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences'

/*attendanceTypes for internal use
  'P': came to classroom,
  'L': came late to classrom,
  'A': absent,
  'J': justified,
  'I': ignore day
*/
@IonicPage()
@Component({
    selector: 'page-configurations',
    templateUrl: 'configurations.html',
})
export class ConfigurationsPage {

    attendance_p = ''
    attendance_l = ''
    attendance_a = ''
    attendance_j = ''
    attendance_i = ''
    constructor(public appPreferences: AppPreferences, public toastCtrl : ToastController) {
        this.appPreferences.fetch('attendance_p').then(value => {
            this.attendance_p = value
            return this.appPreferences.fetch('attendance_l')
        }).then(value => {
            this.attendance_l = value
            return this.appPreferences.fetch('attendance_a')
        }).then(value => {
            this.attendance_a = value
            return this.appPreferences.fetch('attendance_j')
        }).then(value => {
            this.attendance_j = value
            return this.appPreferences.fetch('attendance_i')
        }).then(value => { this.attendance_i = value })
            .catch(error => {
                this.toastCtrl.create({
                    closeButtonText: 'Ok',
                    dismissOnPageChange: true,
                    duration: 3500,
                    message: 'No se puedieron cargar las configuraciones.',
                    position: 'bottom',
                    showCloseButton: true
                }).present()
            })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ConfigurationsPage');
    }

    saveConfig(form) {
        let values = form.value
        this.appPreferences.store('attendance_p', values.attendance_p).then(result=>{
            return this.appPreferences.store('attendance_l', values.attendance_l)
        }).then(result=>{
            return this.appPreferences.store('attendance_a', values.attendance_a)
        }).then(result=>{
            return this.appPreferences.store('attendance_j', values.attendance_j)
        }).then(result=>{
            this.appPreferences.store('attendance_i', values.attendance_i)
        }).catch(error=>{
            this.toastCtrl.create({
                closeButtonText: 'Ok',
                dismissOnPageChange: true,
                duration: 3500,
                message: 'No se puedieron guardar las configuraciones.',
                position: 'bottom',
                showCloseButton: true
            }).present()
        })
    }

}
