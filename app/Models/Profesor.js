'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profesor extends Model {
    asignatura() {
        return this.hasOne('App/Models/Asignatura')
    }
}

module.exports = Profesor
