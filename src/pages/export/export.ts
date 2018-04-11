import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file'
import { GroupsProvider } from '../../providers/groups/groups'

@IonicPage()
@Component({
    selector: 'page-export',
    templateUrl: 'export.html',
})
export class ExportPage {

    group_id: number = 0
    public fullname = ''
    onlyMonth = true
    year = ''
    month = ''
    day = ''

    public startDate = ''
    public endDate = ''

    constructor(public file: File, public navParams: NavParams, public groupsProvider: GroupsProvider, public toastCtrl: ToastController) {
        let params = navParams.data

        this.group_id = params.group_id
        this.fullname = params.fullname

        let today = new Date()
        this.year = today.getFullYear().toString()
        this.month = (today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : `${(today.getMonth() + 1)}`
        this.day = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`

        this.startDate = `${this.year}-${this.month}-${this.day}`
        this.endDate = `${this.year}-${this.month}-${this.day}`
    }

    ionViewDidLoad() {
    }

    changeOnlyMonth() {
        this.onlyMonth = !this.onlyMonth
    }

    export(form) {
        let options = {
            closeButtonText: 'Ok',
            dismissOnPageChange: true,
            duration: 3500,
            position: 'bottom',
            showCloseButton: true,
            message: 'Archivo generado.',
        }

        let toast = null

        this.groupsProvider.exportByMonth(this.group_id, this.month, this.year).then(attendances => {
            let today = new Date()
            let groupName = this.fullname.replace(' ', '_')
            let fileName = `${groupName}_${this.year}${this.month}${this.day}_${today.getHours()}${today.getMinutes()}${today.getSeconds()}.csv`
            return this.writeFile(attendances.rows, fileName)
        }).then(fileEntry => {

        }).catch(error => {
            options.message = 'Error exportando.'
        })

        toast = this.toastCtrl.create(options)
        toast.present()
    }

    private writeFile(data, filename) {
        let text: string = ''
        let fileRows = new Array<string>()
        let fileRowIndex = 0
        let attendance_id = 0

        for (let i = 0; i < data.length; i++) {
            const row = data.item(i)

            //when a new registry start
            if (attendance_id != row.attendance_id) {
                attendance_id = row.attendance_id
                fileRowIndex = 0
            }
            fileRows[fileRowIndex] = fileRows[fileRowIndex] != undefined ? fileRows[fileRowIndex] += `${row.type},` : `${row.type},`
            fileRowIndex++

        }

        for (let i = 0; i < fileRows.length; i++) {
            text += (fileRows[i].substr(0, fileRows[i].length - 1) + '\n')
        }

        return this.file.writeFile(`${this.file.externalRootDirectory}checkme/archivos/`, filename, text)
    }

}
7