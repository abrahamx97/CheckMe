import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  students: Array<{ id: number, name: string, absences: number }>
  options: Array<{ icon: string, color: string, defaultColor: string }>
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.students = [
      { id: 1, name: 'Abraham Gutiérrez Lara', absences: 13 },
      { id: 2, name: 'José Manuel Chávez Castillo', absences: 1 },
      { id: 3, name: 'Martin Vicente Santos', absences: 4 }
    ]

    

    this.options = [
      { icon: 'checkmark-circle', color: 'secondary', defaultColor: 'secondary'},
      {icon: 'clock', color: 'warning', defaultColor: 'dark'},
      {icon: 'create', color: 'primary', defaultColor: 'dark'}, 
      {icon: 'close-circle', color: 'danger', defaultColor: 'dark'}
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

}
