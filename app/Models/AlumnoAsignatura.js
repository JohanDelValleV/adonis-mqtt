'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AlumnoAsignatura extends Model {
    alumnos() {
        return this.hasMany('App/Models/Alumno')
    }

    asignaturas() {
        return this.hasMany('App/Models/Asignatura')
    }
}

module.exports = AlumnoAsignatura
