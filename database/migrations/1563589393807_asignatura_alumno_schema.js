'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsignaturaAlumnoSchema extends Schema {
  up () {
    this.create('alumno_asignatura', (table) => {
      table.increments()
      table.integer('alumno_id').unsigned().references('alumnos.id').onDelete('cascade').index('alumno_id')
      table.integer('asignatura_id').unsigned().references('asignaturas.id').onDelete('cascade').index('asignatura_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('alumno_asignatura')
  }
}

module.exports = AsignaturaAlumnoSchema
