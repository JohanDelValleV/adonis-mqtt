'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlumnoHasAsignaturaSchema extends Schema {
  up () {
    this.create('alumno_has_asignaturas', (table) => {
      table.increments()
      table.integer('id_alumno').unsigned().references('id').inTable('alumnos')
      table.integer('id_asignatura').unsigned().references('id').inTable('asignaturas')
      table.timestamps()
    })
  }

  down () {
    this.drop('alumno_has_asignaturas')
  }
}

module.exports = AlumnoHasAsignaturaSchema
