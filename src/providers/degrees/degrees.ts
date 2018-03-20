import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite'

import { DatabaseProvider } from  '../database/database'

@Injectable()
export class DegreesProvider {

    database : SQLiteObject = null
    constructor() {
        this.database=DatabaseProvider.getDatabaseReference()
    }

    all(){
        return this.database.executeSql(`select * from degrees`, {})
    }

}
