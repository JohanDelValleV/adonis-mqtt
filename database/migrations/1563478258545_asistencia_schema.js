'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsistenciaSchema extends Schema {
  up () {               
    this.create('asistencias', (table) => {
      table.increments()
      table.integer('alumno_id').unsigned().references('id').inTable('alumnos').notNullable().onDelete('cascade');
      //                        .unsigned().references('id').inTable('asignaturas').notNullable().unique().onDelete('cascade');
      table.integer('rfid')      
      table.integer('matricula')
      table.string('asignatura')
      table.date('fecha')
      table.time('hora')

      table.timestamps()
    })
  }

  down () {
    this.drop('asistencias')
  }
}

module.exports = AsistenciaSchema
