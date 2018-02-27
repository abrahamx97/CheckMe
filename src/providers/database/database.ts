import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite'

@Injectable()
export class DatabaseProvider {

  database : SQLiteObject = null

  constructor(public sqlite : SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  createDatabase(){
      return this.sqlite.create({
          name: 'checkme.db',
          location: 'default'
      })
  }
  
  createTables(){
      let sql = 
        `create table grados(
            id_grado integer primary key,
            grado int,
            grado_texto varchar(20)
        );
        
        create table asistencias(
            id_asistencia integer primary key,
            fecha varchar(20)
        );
        
        create table grupos(
            id_grupo integer primary key,
            id_grado integer,
            nombre varchar(40),
            abreviacion varchar(15),
            foreign key (id_grado) references grados(id_grado)
        );
        
        create table alumnos (
            id_alumno integer primary key,
            id_grupo integer,
            nombre varchar(40),
            paterno varchar(40),
            materno varchar(40),
            foreign key (id_grupo) references grupos(id_grupo)
        );
        
        create table detalle_asistencias(
            id_asistencia integer,
            id_alumno integer,
            tipo int,
            foreign key (id_asistencia) references asistencias(id_asistencia),
            foreign key (id_alumno) references alumnos(id_alumno)
        );`

        return this.database.executeSql(sql, {})
  }
  setDatabase(database : SQLiteObject){
      if(this.database === null){
          this.database=database
      }
  }

}
