import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite'


@Injectable()
export class DatabaseProvider {

    protected database: SQLiteObject = null

    /*databaseReference variable is a static reference to database, it is initialize in platform.ready() event. Its lifecycle is the same as applications lifecycle. It avoid close or reopen database on each page/provider, each page/provider just read and copy the databaseReference on its own file.
    */
    private static databaseReference: SQLiteObject = null

    constructor(public sqlite: SQLite) {

    }

    static getDatabaseReference() {
        return this.databaseReference
    }

    static setDatabaseReference(database: SQLiteObject) {
        this.databaseReference = database
    }

    createDatabase() {
        return this.sqlite.create({
            name: 'checkme.db',
            location: 'default'
        })
    }

    getDatabase() {
        return this.database
    }

    createTables() {
        let degrees =`create table if not exists degrees(
                degree_id integer primary key,
                degree int,
                degree_text varchar(20)
            );`
        let attendances=`
            create table if not exists attendances(
                attendance_id integer primary key autoincrement,
                attendance_date date
            );`
            
        let groups=`create table if not exists groups(
                group_id integer primary key autoincrement,
                degree_id integer,
                name varchar(40),
                foreign key (degree_id) references degrees(degree_id)
            );`
            
        let students = `create table if not exists students (
                student_id integer primary key,
                group_id integer,
                ID varchar(30),
                gender varchar(2),
                name varchar(100),
                foreign key (group_id) references groups(group_id)
            );`
            
        let attendance_detail=`create table if not exists attendance_detail(
                attendance_id integer,
                student_id integer,
                type varchar(2),
                foreign key (attendance_id) references attendances(attendance_id),
                foreign key (student_id) references students(student_id)
            );`
        return this.database.executeSql(degrees, {}).then(result=>{
            return this.database.executeSql(attendances, {})
        }).then(result=>{
            return this.database.executeSql(groups, {})
        }).then(result=>{
            return this.database.executeSql(students, {})
        }).then(result=>{
            return this.database.executeSql(attendance_detail, {})
        })
    }

    setDatabase(database: SQLiteObject) {
        DatabaseProvider.setDatabaseReference(database)
        this.database = DatabaseProvider.getDatabaseReference()
    }


    //insert default degrees
    insertDegrees() : Promise<any>{
        return new Promise<any>((resolve, reject)=>{
            let sql = `insert into degrees(degree_id, degree, degree_text) values (1,1,'Primero'), (2,2,'Segundo'), (3,3,'Tercero'), (4,4,'Cuarto'), (5,5,'Quinto'), (6,6,'Sexto'), (7,7,'Septimo'), (8,8,'Octavo'), (9,9,'Noveno'), (10,10,'Décimo')`
            this.database.executeSql('select count(*) as rows from degrees', {}).then(data=>{
                if(data.rows.item(0).rows>=10){
                    resolve(true);
                }else{
                    return this.database.executeSql(sql, {})
                }
            }).then(result=>{
                if(result.rowsAffected>0){
                    resolve(true)
                }else{
                    resolve(false)
                }
            }).catch(error=>{
                reject(error)
            })
        })       
    }

    closeDatabase() {
        return this.database.close()
    }





}
