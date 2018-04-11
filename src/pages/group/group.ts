import { Component, group } from '@angular/core';
import { IonicPage, NavParams, PopoverController, ToastController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage'
import { GroupsProvider } from '../../providers/groups/groups'
import { GroupPopOverPage } from '../group-pop-over/group-pop-over'

@IonicPage()
@Component({
    selector: 'page-group',
    templateUrl: 'group.html',
})
export class GroupPage {

    /*attendanceTypes for internal use
      'P': came to classroom,
      'L': came late to classrom,
      'A': absent,
      'J': justified,
      'I': ignore day
    */

    students = new Array<{ student_id: number, id: number, name: string, attendanceType?: string, options?: [{ name: string, icon: string, color: string, defaultColor: string }] }>()
    fullname = 'Grupo'
    group_id = 0
    action = 'Guardar'

    private today = ''


    constructor(public navParams: NavParams, public groupsProvider: GroupsProvider, public popoverCtrl: PopoverController, public toastCtrl: ToastController, public storage: NativeStorage) {

        let date = new Date();
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString();
        let month = (date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getDate() + 1).toString()
        this.today = `${date.getFullYear()}-${month}-${day}`

        let params = navParams.data
        this.group_id = params.group_id
        this.fullname = params.fullname

        this.existsIdToday().then(exists=>{
            if(exists==true){
                this.action='Actualizar'
            }else{

            }
        })

        this.groupsProvider.find(this.group_id).then(students => {
            let dataStudents = new Array<any>()
            for (let i = 0; i < students.rows.length; i++) {
                let student = students.rows.item(i)
                student['options'] = [
                    { name: 'P', icon: 'checkmark-circle', color: 'secondary', defaultColor: 'secondary' },
                    { name: 'L', icon: 'clock', color: 'warning', defaultColor: 'dark' },
                    { name: 'J', icon: 'create', color: 'primary', defaultColor: 'dark' },
                    { name: 'A', icon: 'close-circle', color: 'danger', defaultColor: 'dark' }
                ]
                student['attendanceType'] = 'P'
                dataStudents.push(students.rows.item(i))
            }
            this.students = dataStudents
        }).catch(error => {

        })
    }

    ionViewDidLoad() {
    }

    applyOption(optionName) {
        this.students.forEach(student => {
            student.options.forEach(option => {
                if (option.name == optionName && optionName != 'I') {
                    option.defaultColor = option.color
                } else {
                    option.defaultColor = 'dark'
                }
            });

            student.attendanceType = optionName
        })
    }

    moreOptions(ev) {
        let popover = this.popoverCtrl.create(
            GroupPopOverPage,
            {
                options: [
                    { icon: 'checkmark-circle', color: 'secondary', label: 'Asistencia', name: 'P' },
                    { icon: 'clock', color: 'warning', label: 'Retardo', name: 'L' },
                    { icon: 'create', color: 'primary', label: 'Justificar', name: 'J' },
                    { icon: 'close-circle', color: 'danger', label: 'Falta', name: 'A' },
                    { icon: '', color: '', label: 'Ignorar día', name: 'I' }
                ]
            }, {
                cssClass: 'pop-over'
            }
        )

        popover.onDidDismiss(optionName => {
            if (optionName) {
                this.applyOption(optionName)
            }
        })

        popover.present({
            ev: ev
        })
    }

    changeAttendance(optionName, studentIndex) {
        this.students[studentIndex].options.forEach(option => {
            if (option.name == optionName) {
                option.defaultColor = option.color
                this.students[studentIndex]['attendanceType'] = option.name
            } else {
                option.defaultColor = 'dark'
            }
        });
    }

    saveAttendances() {
        let toast = null
        let options = {
            closeButtonText: 'Ok',
            dismissOnPageChange: true,
            duration: 3500,
            position: 'bottom',
            showCloseButton: true,
            message: 'Asistencia guardada.'
        }

        this.groupsProvider.saveAttendances(this.students).then(result => {
            if (!(result.rowsAffected > 0)) {
                options.message = 'No se pudo guardar la asistencia.'
            }
        }).then(result=>{

        }).catch(error => {
            options.message = 'No se pudo guardar la asistencia.'
        })

        toast = this.toastCtrl.create(options)
        toast.present()
    }

    private existsIdToday(){
        return new Promise((resolve, reject)=>{
            this.groupsProvider.existAttendanceAtDate(this.group_id, this.today).then(data=>{
                if(data.rows.length>0 && data.rows.item(0).it_exists=='1'){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }).catch(error=>{
                console.log(JSON.stringify(error))
                reject(error)
            })
        })
    }
}
