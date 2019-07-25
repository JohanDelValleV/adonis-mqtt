'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asistencia extends Model {
    alumno(){
        return this.belongsTo('App/Models/Alumno')
    }
}

module.exports = Asistencia
