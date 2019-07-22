'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Horario extends Model {
    asignaturas() {
        return this.belongsToMany('App/Models/Asignatura')
    }
}

module.exports = Horario
