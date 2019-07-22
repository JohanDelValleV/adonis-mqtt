'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsignaturaHorarioSchema extends Schema {
  up () {
    this.create('asignatura_horario', (table) => {
      table.increments()
      table.integer('asignatura_id').unsigned().references('id').inTable('asignaturas').onDelete('cascade').index('id_asignatura');
      table.integer('horario_id').unsigned().references('id').inTable('horarios').onDelete('cascade').index('horario_id');
      table.timestamps()
    })
  }

  down () {
    this.drop('asignatura_horario')
  }
}

module.exports = AsignaturaHorarioSchema
