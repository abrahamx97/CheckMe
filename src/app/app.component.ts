import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file'
import { AppPreferences } from '@ionic-native/app-preferences'

import { GroupsPage } from '../pages/groups/groups';
import { ConfigurationsPage } from '../pages/configurations/configurations'
import { ImportPage } from '../pages/import/import'

import { DatabaseProvider } from '../providers/database/database'


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav
    rootPage: any = null;

    pages: Array<{ label: string, icon: string, component: any }> = null

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private databaseProvider: DatabaseProvider, public file: File, public appPreferences : AppPreferences) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            this.databaseProvider.createDatabase().then(database => {
                this.databaseProvider.setDatabase(database)
                return this.databaseProvider.createTables()
            }).then(result => {
                return this.databaseProvider.insertDegrees()
            }).then(inserted => {
                if (inserted) {
                    return this.createDir(this.file.externalRootDirectory, 'checkme')
                }
            }).then(created => {
                if (created) {
                    return this.createDir(`${this.file.externalRootDirectory}checkme/`, 'archivos')
                }
            }).then(created => {
                if (created) {
                    this.rootPage = GroupsPage
                    splashScreen.hide()
                }
            }).catch(error => {

                this.errorHandler(error)
            })

        });

        this.pages = [
            { label: 'Grupos', icon: 'people', component: GroupsPage },
            { label: 'Importar', icon: 'arrow-round-down', component: ImportPage },
            { label: 'Configuración', icon: 'options', component: ConfigurationsPage }
        ]
    }

    private errorHandler(error) {
    }

    openPage(page) {
        this.nav.setRoot(page.component)
    }

    // according to this post https://github.com/ionic-team/ionic-native/issues/1711
    //checkFile and CheckDir never return false when a file or dir does nto exists instead
    //it return an error when file  or dir does not exists, when it happens the dir is created
    private createDir(dirPath: string, dirName: string) {
        return new Promise<any>((resolve, reject) => {
            this.file.checkDir(dirPath, dirName).then(exists => {
                resolve(true)
            }).catch(error => {
                this.file.createDir(dirPath, dirName, false).then(dirEntry => {
                    if (dirEntry) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        })
    }
}

