'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlumnoSchema extends Schema {
  up () {
    this.create('alumnos', (table) => {
      table.increments()
      table.string('nombre').notNullable();
      table.string('apellidoPaterno').notNullable();
      table.string('apellidoMaterno').notNullable();
      table.integer('matricula').notNullable();
      table.integer('rfid').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('alumnos')
  }
}

module.exports = AlumnoSchema
