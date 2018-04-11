import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite'

import { DatabaseProvider } from '../database/database'

@Injectable()
export class GroupsProvider {

    database: SQLiteObject = null
    constructor() {
        this.database = DatabaseProvider.getDatabaseReference()
    }

    all() {
        return this.database.executeSql('select g.*, d.degree_text from groups  as g inner join degrees as d on g.degree_id=d.degree_id order by degree_text, name', {})
    }

    existAttendanceAtDate(group_id, attendance_date){
        return this.database.executeSql(`select 1 as it_exists from attendances as a inner join attendance_detail as ad on a.attendance_id=ad.attendance_id inner join students as s on ad.student_id=s.student_id where s.group_id=${group_id} and a.attendance_date='${attendance_date}'`, {})
    }

    saveStudentsGroup(students: Array<{}>, degree_id: number, name: string, defaultHeaders: boolean, headers?: Array<string>) {
        let last_student_id = new Array<number>()
        return this.database.executeSql(`insert into groups(degree_id, name) values (${degree_id}, '${name}')`, {}).then(result => {

            return this.database.executeSql('select student_id from students order by student_id desc limit 1', {})

        }).then(data => {
            if (data.rows.length > 0) {
                last_student_id.push(<number>(data.rows.item(0).student_id))
            } else {
                last_student_id.push(0)
            }
            return this.database.executeSql('select group_id from groups order by group_id desc limit 1', {})
        }).then(data => {
            if (data.rows.length > 0) {
                let group_id = data.rows.item(0).group_id
                let next_student_id = last_student_id.pop() + 1
                let dataHeaders = ['ID', 'name', 'gender']
                if (!defaultHeaders) {
                    dataHeaders = headers
                }

                let values = ''
                for (let i = 0; i < students.length; i++) {
                    let subvalues = `(${group_id}, ${next_student_id}, `
                    for (let j = 0; j < dataHeaders.length; j++) {
                        let student = students[i]
                        subvalues += `'${student[dataHeaders[j]]}',`

                    }
                    values += subvalues.substr(0, subvalues.length - 1) + '),'
                    next_student_id++
                }
                values = values.substr(0, values.length - 1)

                return this.database.executeSql(`insert into students(group_id, student_id, ID, name, gender) values ${values}`, {})
            }
        })
    }

    find(group_id) {
        return this.database.executeSql(`select student_id, ID as id, name from students where group_id = ${group_id} order by ID asc`, {})
    }

    saveAttendances(students: Array<any>) {
        return this.database.executeSql(`insert into attendances(attendance_date) values (date())`, {}).then(result => {
            if (result.rowsAffected > 0) {
                return this.database.executeSql('select attendance_id from attendances order by attendance_id desc limit 1', {})
            }
        }).then(data => {
            let attendance_id: number = 0
            if (!(data.rows.length > 0)) {
                return
            }
            attendance_id = data.rows.item(0).attendance_id

            let values = ''
            for (let i = 0; i < students.length; i++) {
                let student_id = students[i].student_id
                let attendanceType = students[i].attendanceType
                values += `(${attendance_id},${student_id},'${attendanceType}'),`
            }

            values = values.substr(0, values.length - 1)

            return this.database.executeSql(`insert into attendance_detail(attendance_id, student_id, type) values ${values}`,{})
        })
    }

    exportByMonth(group_id : number, month : string, year : string) {
        let sql = `select ad.type, s.student_id, a.attendance_id from attendances as a inner join attendance_detail as ad on ad.attendance_id=a.attendance_id inner join students as s on ad.student_id=s.student_id where s.group_id=${group_id} and strftime('%m-%Y',a.attendance_date)='${month}-${year}' order by a.attendance_id, s.student_id asc`

        return this.database.executeSql(sql, {})
    }

    exportByRange(group_id : number, startDate : string, endDate : string) {
        let sql = `select ad.type, s.student_id, a.attendance_id from attendances as a inner join attendance_detail as ad on ad.attendance_id=a.attendance_id inner join students as s on ad.student_id=s.student_id where s.group_id=${group_id} and a.attendance_date between '${startDate}' and '${endDate}' order by a.attendance_id, s.student_id asc`

        return this.database.executeSql(sql, {})
    }

}
