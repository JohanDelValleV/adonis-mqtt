'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsignaturaHasHorarioSchema extends Schema {
  up () {
    this.create('asignatura_has_horarios', (table) => {
      table.increments()
      table.integer('id_asignatura').unsigned().references('id').inTable('asignaturas')
      table.integer('id_horario').unsigned().references('id').inTable('horarios')
      table.timestamps()
    })
  }

  down () {
    this.drop('asignatura_has_horarios')
  }
}

module.exports = AsignaturaHasHorarioSchema
