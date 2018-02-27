import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite'

import { MyApp } from './app.component';
import { GroupsPage } from '../pages/groups/groups';
import { GroupPage } from '../pages/group/group'
import { StudentPage } from '../pages/student/student'
import { DataPage } from '../pages/data/data'
import { ConfigurationsPage } from '../pages/configurations/configurations'

import { DatabaseProvider } from '../providers/database/database';
import { GroupsProvider } from '../providers/groups/groups';
import { GroupProvider } from '../providers/group/group';
import { StudentProvider } from '../providers/student/student';

@NgModule({
  declarations: [
    MyApp,
    GroupsPage,
    GroupPage,
    StudentPage,
    ConfigurationsPage,
    DataPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GroupsPage,
    GroupPage,
    StudentPage,
    ConfigurationsPage,
    DataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    GroupsProvider,
    GroupProvider,
    StudentProvider
  ]
})
export class AppModule {}
