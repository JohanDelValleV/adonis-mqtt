'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsignaturaSchema extends Schema {
  up () {
    this.create('asignaturas', (table) => {
      table.increments()
      table.string('nombre').notNullable();
      table.string('slug').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('asignaturas')
  }
}

module.exports = AsignaturaSchema
