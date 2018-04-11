import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
    selector: 'page-group-pop-over',
    templateUrl: 'group-pop-over.html',
})
export class GroupPopOverPage {

    options: [{ label: string, name: string }] = null

    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
        this.options = this.navParams.data.options
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupPopOverPage');
    }

    selectOption(optionName){
        this.viewCtrl.dismiss(optionName)
    }

}
