'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HorarioSchema extends Schema {
  up () {
    this.create('horarios', (table) => {
      table.increments()
      table.string('lunes').notNullable();
      table.string('martes').notNullable();
      table.string('miercoles').notNullable();
      table.string('jueves').notNullable();
      table.string('viernes').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('horarios')
  }
}

module.exports = HorarioSchema
