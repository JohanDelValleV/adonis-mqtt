'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsignaturaSchema extends Schema {
  up () {
    this.create('asignaturas', (table) => {
      table.increments()
      // table.integer('id_profesor').unsigned().references('id').inTable('profesors')
      // table.integer('id_horario').unsigned().references('id').inTable('horarios')
      table.string('nombre')
      table.timestamps()
    })
  }

  down () {
    this.drop('asignaturas')
  }
}

module.exports = AsignaturaSchema
