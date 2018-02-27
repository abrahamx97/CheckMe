import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GroupPage } from '../group/group'
/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-groups',
    templateUrl: 'groups.html',
})
export class GroupsPage {

    groups: Array<{ id: number, name: string }>
    

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.groups = [
            {id: 1, name: 'Tercero B'},
            {id: 2, name: 'Primero A'}
        ]
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupsPage');
    }

    groupDetail(id : number){
        this.navCtrl.push(GroupPage, {id: id})
    }

}
