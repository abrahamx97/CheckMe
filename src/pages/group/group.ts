import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupsProvider } from '../../providers/groups/groups'

@IonicPage()
@Component({
    selector: 'page-group',
    templateUrl: 'group.html',
})

export class GroupPage {

    /*attendanceTypes for internal use
      'P': came to classroom,
      'A': absent,
      'J': justified,
      'I': ignore day
    */

    students = new Array<{ id: number, name: string, absences?: number, attendanceType?: 'P' }>()
    options = new Array<{ icon: string, color: string, defaultColor: string }>()
    fullname = 'Grupo'

    constructor(public navCtrl: NavController, public navParams: NavParams, public groupsProvider: GroupsProvider) {
        this.fullname=this.navParams.data.fullname
        this.groupsProvider.find(this.navParams.data.group_id).then(students => {
            let dataStudents = new Array<any>()
            for (let i = 0; i < students.rows.length; i++) {
                dataStudents.push(students.rows.item(i))
            }
            this.students=dataStudents
        }).catch(error => {

        })

        this.options = [
            { icon: 'checkmark-circle', color: 'secondary', defaultColor: 'secondary' },
            { icon: 'clock', color: 'warning', defaultColor: 'dark' },
            { icon: 'create', color: 'primary', defaultColor: 'dark' },
            { icon: 'close-circle', color: 'danger', defaultColor: 'dark' }
        ]
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupPage');
    }

}
