'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlumnoSchema extends Schema {
  up () {
    this.create('alumnos', (table) => {
      table.increments()
      table.string('nombre')
      // table.integer('id_asignatura').unsigned().references('id').inTable('asignaturas')
      table.string('apellidoPaterno')
      table.string('apellidoMaterno')
      table.integer('matricula')
      table.integer('rfid')
      table.timestamps()
    })
  }

  down () {
    this.drop('alumnos')
  }
}

module.exports = AlumnoSchema
