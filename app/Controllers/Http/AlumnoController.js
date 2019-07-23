'use strict'
const Alumno = use('App/Models/Alumno');
const { validate } = use('Validator');

const rules = {
  nombre: 'required',
  apellidoPaterno: 'required',
  apellidoMaterno: 'required',
  matricula: 'required',
  rfid: 'required'
};

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with alumnos
 */
class AlumnoController {
  /**
   * Show a list of all alumnos.
   * GET alumnos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let alumno = await Alumno.query().with('asignaturas.horarios').with('asignaturas.profesor').fetch()
    
    return response.status(200).json(alumno)
  }

  /**
   * Render a form to be used for creating a new alumno.
   * GET alumnos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new alumno.
   * POST alumnos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    }
    let {asignaturas, ...data} = request.all(['asignaturas'])
    
    let alumno = await Alumno.create(data)

    if (asignaturas && asignaturas.length > 0) {
      await alumno.asignaturas().attach(asignaturas)
      await alumno.load('asignaturas')
    }
    return response.ok(alumno)
    
  }

  /**
   * Display a single alumno.
   * GET alumnos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let {id} = params
    let alumno = await Alumno.query().with('asignaturas.horarios').with('asignaturas.profesor').where('id', '=', id).fetch()
    if (alumno.rows == 0) {
      return response.status(404).json({data: 'Resource not found'})
    }
    return response.ok(alumno)
  }

  /**
   * Render a form to update an existing alumno.
   * GET alumnos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update alumno details.
   * PUT or PATCH alumnos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let alumno = await Alumno.findOrFail(params.id)
    let {asignaturas, ...data} = request.all(['asignaturas'])
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    }
    alumno.merge(data)
    await alumno.save()

    if (asignaturas && asignaturas.length > 0) {
      await alumno.asignaturas().sync(asignaturas)
      await alumno.loadMany(['asignaturas.horarios', 'asignaturas.profesor'])
    }
    
    return response.status(200).json(alumno)
  }

  /**
   * Delete a alumno with id.
   * DELETE alumnos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let { id } = params
    let alumno = await Alumno.find(id)
    if (!alumno) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await alumno.delete()
    return response.status(200).json(null)
  }
}

module.exports = AlumnoController
