'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Alumno extends Model {
    asignaturas() {
        return this.manyThrough('App/Models/Asignatura', 'asignaturas')
    }
}

module.exports = Alumno
