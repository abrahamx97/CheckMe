import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupPage } from '../group/group'

import { GroupsProvider } from '../../providers/groups/groups'

@IonicPage()
@Component({
    selector: 'page-groups',
    templateUrl: 'groups.html',
})
export class GroupsPage {

    groups: Array<any>


    constructor(public navCtrl: NavController, public navParams: NavParams, private groupsProvider: GroupsProvider) {
        this.groupsProvider.all().then(groups => {
            let dataGroups = new Array<{}>()
            for(let i=0; i<groups.rows.length; i++){
                dataGroups.push(groups.rows.item(i))
            }
            this.groups=dataGroups
        }).catch(error => {

        })
    }

    ionViewDidLoad() {
        
    }

    groupDetail(group_id, degree_text, name) {
        this.navCtrl.push(GroupPage, { group_id: group_id, fullname: `${degree_text} ${name}` })
    }

}
