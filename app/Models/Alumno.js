'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Alumno extends Model {
    asignatura() {
        return this.manyThrough('App/Models/AlumnoAsignatura', 'asignaturas')
    }

    alumno() {
        return this.manyThrough('App/Models/AlumnoAsignatura', 'alumnos')
    }
}

module.exports = Alumno
