'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsistenciaSchema extends Schema {
  up () {
    this.create('asistencias', (table) => {
      table.increments()
      table.integer('id_alumno').unsigned().references('id').inTable('alumnos').notNullable();
      table.datetime('fecha').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('asistencias')
  }
}

module.exports = AsistenciaSchema
