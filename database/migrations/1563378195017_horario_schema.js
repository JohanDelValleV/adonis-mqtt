'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HorarioSchema extends Schema {
  up () {
    this.create('horarios', (table) => {
      table.increments()
      table.string('dia').notNullable().defaultTo('lunes');
      table.string('hora_inicio').notNullable().defaultTo('08.00:00');
      table.string('hora_fin').notNullable().defaultTo('10.00:00');
      table.timestamps()
    })
  }

  down () {
    this.drop('horarios')
  }
}

module.exports = HorarioSchema
