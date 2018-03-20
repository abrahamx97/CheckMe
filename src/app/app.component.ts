import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GroupsPage } from '../pages/groups/groups';
import { ConfigurationsPage } from '../pages/configurations/configurations'
import { ImportPage } from '../pages/import/import'
import { ExportPage } from '../pages/export/export'

import { DatabaseProvider } from '../providers/database/database'

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav
    rootPage: any = null;

    pages: Array<{ label: string, icon: string, component: any }> = null

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private databaseProvider: DatabaseProvider, ) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            this.databaseProvider.createDatabase().then(database => {
                this.databaseProvider.setDatabase(database)
                return this.databaseProvider.createTables()
            }).then(result => {
                return this.databaseProvider.insertDegrees()
            }).then(inserted => {
                if (inserted) {
                    this.rootPage = GroupsPage
                    splashScreen.hide();
                }
            }).catch(error => {

                this.errorHandler(error)
            })

        });

        this.pages = [
            { label: 'Grupos', icon: 'people', component: GroupsPage },
            { label: 'Importar', icon: 'arrow-round-down', component: ImportPage },
            { label: 'Exportar', icon: 'arrow-round-up', component: ExportPage },
            { label: 'Configuración', icon: 'options', component: ConfigurationsPage }
        ]
    }

    private errorHandler(error) {

    }

    openPage(page) {
        this.nav.setRoot(page.component)
    }
}

