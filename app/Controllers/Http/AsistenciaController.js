'use strict'
const Asistencia = use('App/Models/Asistencia');
const Alumno = use('App/Models/Alumno');
const Asignatura = use('App/Models/Alumno')
const { validate } = use('Validator');
const io = require('socket.io-client');
const socket = io('http://localhost:3000')
const rules = {
  rfid: 'required',
};

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


/**
 * Resourceful controller for interacting with asistencias
 */
class AsistenciaController {
  /**
   * Show a list of all asistencias.
   * GET asistencias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let asistencia = await Asistencia.all()
    return response.status(200).json(asistencia)
  }

  /**
   * Render a form to be used for creating a new asistencia.
   * GET asistencias/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new asistencia.
   * POST asistencias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {      
      const validation = await validate(request.all(), rules)
      const rfids = request._body.rfid
      const moment = require('moment')      
      let currentDate = moment().format('YYYY-MM-DD')
      let currentTime = moment().format('hh:mm:ss')            
      if (!validation.fails()){
        let alumno = await Alumno.query(). where('rfid', '=', rfids).with('asignaturas').fetch()         
        const b =  JSON.parse(JSON.stringify(alumno));
        let asignatura = b[0].asignaturas[0].nombre
        if(alumno.rows != 0){
          let diaAsistencia = await Asistencia.query().where('fecha', '=', currentDate).andWhere('rfid', rfids).fetch()
          if(diaAsistencia.rows != 0){
            return response.json({data: 'ya se registro por el dia de hoy'})
          }
          const asistencia = new Asistencia()
          asistencia.rfid = rfids
          asistencia.matricula = b[0].matricula
          asistencia.alumno_id = b[0].id   
          asistencia.hora = currentTime
          asistencia.fecha = currentDate
          asistencia.asignatura = asignatura
          await asistencia.save()
          return response.status(201).json(asistencia)                          
          
          // let asistencia = await Asistencia.create(request.all())
          // return response.created(asistencia)            
        }else{          
          socket.emit('rfid',rfids)
          return response.status(404).json({data: 'rfid not exist'})
          }
      }
      return validation.messages()       
      
  }  

  /**
   * Display a single asistencia.
   * GET asistencias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      let {id} = params
      let asistencia = await Asistencia.findOrFail(id)
      return response.ok(asistencia)
    } catch (error) {
      return response.status(404).json({data: 'Resource not found'})
    }
  }

  async obtener ({ params, request, response, view }) {    
      let {rfid} = params
      let asistencia = await Asistencia.query().where('rfid', '=', rfid).fetch()
      if(asistencia.rows == 0){
        return response.status(404).json({data: 'Resource not found'})      
      }
      return response.ok(asistencia)        
  }
  /**
   * Render a form to update an existing asistencia.
   * GET asistencias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update asistencia details.
   * PUT or PATCH asistencias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a asistencia with id.
   * DELETE asistencias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AsistenciaController
