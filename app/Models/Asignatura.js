'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asignatura extends Model {
    profesor() {
        return this.hasOne('App/Models/Profesor')
    }

    asignatura() {
        return this.manyThrough('App/Models/AlumnoAsignatura').pivotTable('alumno_asignaturas')
    }

    alumno() {
        return this.manyThrough('App/Models/AlumnoAsignatura', 'alumnos')
    }
}

module.exports = Asignatura
