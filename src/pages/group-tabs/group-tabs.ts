import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupPage } from '../group/group'
import { ExportPage } from  '../export/export'

@IonicPage()
@Component({
    selector: 'page-group-tabs',
    templateUrl: 'group-tabs.html',
})
export class GroupTabsPage {

    
    groupPage : any = null
    exportPage : any = null
    params = {}
    constructor(public navCtrl: NavController, public navParams: NavParams) {

        let group_id = navParams.data.group_id
        let fullname = navParams.data.fullname

        this.params = {
            group_id: group_id,
            fullname: fullname
        }

        this.groupPage = GroupPage
        this.exportPage = ExportPage
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupTabsPage');
    }

}
