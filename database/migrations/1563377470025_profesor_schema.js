'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfesorSchema extends Schema {
  up () {
    this.create('profesors', (table) => {
      table.increments()
      table.string('nombre')
      table.string('apellidoPaterno')
      table.string('apellidoMaterno')
      table.integer('matricula')
      table.timestamps()
    })
  }

  down () {
    this.drop('profesors')
  }
}

module.exports = ProfesorSchema
