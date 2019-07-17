'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HorarioSchema extends Schema {
  up () {
    this.create('horarios', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('horarios')
  }
}

module.exports = HorarioSchema
