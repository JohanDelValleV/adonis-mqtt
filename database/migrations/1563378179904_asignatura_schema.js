'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsignaturaSchema extends Schema {
  up () {
    this.create('asignaturas', (table) => {
      table.increments()
      table.string('nombre')
      table.string('slug')
      table.integer('id_profesor').unsigned().references('id').inTable('profesors')
      table.integer('id_alumno').unsigned().references('id').inTable('alumnos')
      table.timestamps()
    })
  }

  down () {
    this.drop('asignaturas')
  }
}

module.exports = AsignaturaSchema
