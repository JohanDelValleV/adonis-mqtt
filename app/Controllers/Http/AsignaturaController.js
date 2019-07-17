'use strict'
const Asignatura = use('App/Models/Asignatura');
const { validate } = use('Validator');
const rules = {
  nombre: 'required'
};

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with asignaturas
 */
class AsignaturaController {
  /**
   * Show a list of all asignaturas.
   * GET asignaturas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let asignatura = await Asignatura.all()
    return response.status(200).json(asignatura)
  }

  /**
   * Render a form to be used for creating a new asignatura.
   * GET asignaturas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new asignatura.
   * POST asignaturas
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
      let asignatura = await Asignatura.create(request.all())
      return response.created(asignatura)
    }
  }

  /**
   * Display a single asignatura.
   * GET asignaturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    let {id} = params
    let asignatura = await Asignatura.findOrFail(id)
    return response.ok(asignatura)
  }

  /**
   * Render a form to update an existing asignatura.
   * GET asignaturas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update asignatura details.
   * PUT or PATCH asignaturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let {id} = params
    let asignatura = await Asignatura.findOrFail(id)
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    }else {
      asignatura.merge(request.all())
      await asignatura.save()
      return response.status(200).json(asignatura)
    }
  }

  /**
   * Delete a asignatura with id.
   * DELETE asignaturas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    let { id } = params
    let asignatura = await Asignatura.find(id)
    if (!asignatura) {
      return response.status(404).json({data: 'Resource not found'})
    }
    await asignatura.delete()
    return response.status(200).json(null)
  }
}

module.exports = AsignaturaController
