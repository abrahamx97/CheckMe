import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupTabsPage } from '../group-tabs/group-tabs'

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
        this.navCtrl.push(GroupTabsPage, { group_id: group_id, fullname: `${degree_text} ${name}` })
    }

}
