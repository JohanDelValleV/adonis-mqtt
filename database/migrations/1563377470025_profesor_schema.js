'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfesorSchema extends Schema {
  up () {
    this.create('profesors', (table) => {
      table.increments()
      table.string('nombre').notNullable();
      table.string('apellidoPaterno').notNullable();
      table.string('apellidoMaterno').notNullable();
      table.integer('matricula').notNullable();
      table.integer('asignatura_id').unsigned().references('id').inTable('asignaturas').notNullable().unique().onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.drop('profesors')
  }
}

module.exports = ProfesorSchema
