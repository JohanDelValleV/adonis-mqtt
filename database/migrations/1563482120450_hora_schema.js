'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HoraSchema extends Schema {
  up () {
    this.create('horas', (table) => {
      table.increments()
      table.integer('id_horario').unsigned().references('id').inTable('horarios').notNullable();
      table.time('hora_inicio').notNullable();
      table.time('hora_fin').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('horas')
  }
}

module.exports = HoraSchema
