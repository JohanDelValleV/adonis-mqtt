'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsistenciaSchema extends Schema {
  up () {
      let now= new Date();
      const dia = now.getDate();
      const mes = now.getMonth()+1;
      const anio = now.getFullYear();
      const fecha_actual = anio +'-' + mes +'-' +dia;

    this.create('asistencias', (table) => {
      table.increments()
      //table.integer('alumno_id').unsigned().references('id').inTable('alumnos').notNullable();
      table.integer('rfid')      
      table.date('fecha').defaultTo(fecha_actual)
      table.timestamps()
    })
  }

  down () {
    this.drop('asistencias')
  }
}

module.exports = AsistenciaSchema
