'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asignatura extends Model {
    profesor() {
        return this.hasOne('App/Models/Profesor')
    }

    alumnos() {
        return this.belongsToMany('App/Models/Alumno')
    }

    horarios() {
        return this.belongsToMany('App/Models/Horario')
    }
}

module.exports = Asignatura
