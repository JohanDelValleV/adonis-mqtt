'use strict'
const Profesor = use('App/Models/Profesor');
const Asignatura = use('App/Models/Asignatura');
const { validate } = use('Validator');
const rules = {
  nombre: 'required',
  apellidoPaterno: 'required',
  apellidoMaterno: 'required',
  matricula: 'required'
};

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profesors
 */
class ProfesorController {
  /**
   * Show a list of all profesors.
   * GET profesors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let profesor = await Profesor.all()
    return response.status(200).json(profesor)
  }

  /**
   * Render a form to be used for creating a new profesor.
   * GET profesors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new profesor.
   * POST profesors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    } else {
      let profesor = await Profesor.create(request.all())
      return response.created(profesor)
    }
  }

  /**
   * Display a single profesor.
   * GET profesors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let {id} = params
    let profesor = await Profesor.findOrFail(id)
    return response.ok(profesor)
  }

  /**
   * Render a form to update an existing profesor.
   * GET profesors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update profesor details.
   * PUT or PATCH profesors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let {id} = params
    let profesor = await Profesor.findOrFail(id)
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    }else {
      profesor.merge(request.all())
      await profesor.save()
      return response.status(200).json(profesor)
    }
  }

  /**
   * Delete a profesor with id.
   * DELETE profesors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let { id } = params
    let profesor = await Profesor.find(id)
    if (!profesor) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await profesor.delete()
    return response.status(200).json(null)
  }
}

module.exports = ProfesorController
