import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GroupsPage } from '../pages/groups/groups';
import { ConfigurationsPage } from '../pages/configurations/configurations'
import { DataPage } from '../pages/data/data'

import { DatabaseProvider } from '../providers/database/database'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav : Nav
  rootPage:any = GroupsPage;

  pages : Array<{label : string, icon : string, component : any }> = null

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private databaseProvider : DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.databaseProvider.createDatabase().then(database => {
        this.databaseProvider.setDatabase(database)
        return this.databaseProvider.createTables()
      }).then(()=>{
          splashScreen.hide();
      }).catch(error =>
        this.errorHandler(error))
    });

    this.pages = [
      {label: 'Grupos', icon: 'people', component: GroupsPage},
      {label: 'Datos', icon: 'analytics', component: DataPage},
      {label: 'Configuración', icon: 'options', component: ConfigurationsPage}
    ]
  }

  private errorHandler(error){

  }

  openPage(page){
      this.nav.setRoot(page.component)
  }
}

