'use strict'
const Horario = use('App/Models/Horario');
const { validate } = use('Validator');

const rules = {
  dia: 'required',
  hora_inicio: 'required',
  hora_fin: 'required',
};
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with horarios
 */
class HorarioController {
  /**
   * Show a list of all horarios.
   * GET horarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let horario = await Horario.query().with('asignaturas').fetch()
    if (horario.rows == 0) {
      return response.status(404).json({data: 'No resource found'})
    }
    return response.status(200).json(horario)
  }

  /**
   * Render a form to be used for creating a new horario.
   * GET horarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new horario.
   * POST horarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let horario = await Horario.create(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    }
    return response.created(horario)
  }

  /**
   * Display a single horario.
   * GET horarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      let {id} = params
      let horario = await Horario.findOrFail(id)
      return response.ok(horario)
    } catch (error) {
      return response.status(404).json({data: 'Resource not found'})
    }
    
    
  }

  /**
   * Render a form to update an existing horario.
   * GET horarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update horario details.
   * PUT or PATCH horarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let horario = await Horario.findOrFail(params.id)
    const validation = await validate(request.all(), rules)
    
    if (validation.fails()) {
      return validation.messages()
    }

    horario.merge(request.all())
    await horario.save()
    return response.status(200).json(horario)
  }

  /**
   * Delete a horario with id.
   * DELETE horarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let {id} = params
    let horario = await Horario.find(id)
    if (!horario) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await horario.delete()
    return response.status(200).json(null)
  }
}

module.exports = HorarioController
