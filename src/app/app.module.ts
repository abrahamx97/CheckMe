import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite'
import { File } from '@ionic-native/file'
import  { AppPreferences } from '@ionic-native/app-preferences'
import { NativeStorage } from '@ionic-native/native-storage'

import { MyApp } from './app.component';
import { GroupsPage } from '../pages/groups/groups';
import { GroupPage } from '../pages/group/group'
import { StudentPage } from '../pages/student/student'
import { ImportPage } from '../pages/import/import'
import { ExportPage } from '../pages/export/export'
import { FileChooserPage } from '../pages/file-chooser/file-chooser'
import { ConfigurationsPage } from '../pages/configurations/configurations'
import { GroupPopOverPage } from '../pages/group-pop-over/group-pop-over'
import { GroupTabsPage } from '../pages/group-tabs/group-tabs'

import { DatabaseProvider } from '../providers/database/database';
import { GroupsProvider } from '../providers/groups/groups';
import { StudentProvider } from '../providers/student/student';
import { FileChooserProvider } from '../providers/file-chooser/file-chooser';
import { DegreesProvider } from '../providers/degrees/degrees';

@NgModule({
  declarations: [
    MyApp,
    GroupPopOverPage,
    GroupsPage,
    GroupPage,
    StudentPage,
    ConfigurationsPage,
    ExportPage,
    ImportPage,
    FileChooserPage,
    GroupTabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GroupPopOverPage,
    GroupsPage,
    GroupPage,
    StudentPage,
    ConfigurationsPage,
    ExportPage,
    ImportPage,
    FileChooserPage,
    GroupTabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    GroupsProvider,
    StudentProvider,
    FileChooserProvider,
    DegreesProvider,
    AppPreferences,
    NativeStorage
  ]
})
export class AppModule {}
