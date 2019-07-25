'use strict'
const Asignatura = use('App/Models/Asignatura');
const Horario = use('App/Models/Horario');
const Database = use('Database')
const rules2 = {
  dia: 'required',
  hora_inicio: 'required',
  hora_fin: 'required',
};

const { validate } = use('Validator');
const rules = {
  nombre: 'required',
  slug: 'required'
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
    let asignatura = await Asignatura.query().with('profesor').with('horarios').fetch()
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
    }

    let arrayHorarios = await request.all()['horarios'];
    let idsHorario = []

    arrayHorarios.forEach(async element => {
      let as = await Horario.create(element)
      idsHorario.push(as.id)
    });

    let form={
      nombre:request.all()['nombre'],
      slug:request.all()['slug'],
      horarios:idsHorario
    }


    let {horarios, ...data} = await form
    let asignatura = await Asignatura.create(data)

    if (horarios && horarios.length > 0) {
      await asignatura.horarios().attach(horarios)
      await asignatura.load('horarios')
    }
    return response.ok(asignatura)
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
    let asignatura = await Asignatura.query().with('profesor').with('horarios').where('id', '=', id).fetch()
    if (asignatura.rows == 0) {
      return response.status(404).json({data: 'Resource not found'})
    }
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
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return validation.messages()
    }

    let arrayHorarios = await request.all()['horarios'];
    let idsHorario = []

    arrayHorarios.forEach(async element => {
      let as = await Horario.create(element)
      idsHorario.push(as.id)
    });

    let form={
      nombre:request.all()['nombre'],
      slug:request.all()['slug'],
      horarios:idsHorario
    }

    let arrayId = await Database.table('horarios')
                                .innerJoin('asignatura_horario', 'horarios.id', 'asignatura_horario.horario_id')
 
    arrayId.forEach(async element => {
      if(request.all()['id']==element['asignatura_id']){
        let id = await element['horario_id']
        let del = await Horario.find(id)
        await del.delete()
      }
    });

    let asignatura = await Asignatura.findOrFail(params.id)
    let {horarios, ...data} = await form
    
    asignatura.merge(data)
    await asignatura.save()

    if (horarios && horarios.length > 0) {
      await asignatura.horarios().sync(horarios)
      await asignatura.load('horarios')
    }

      return response.status(200).json(asignatura)
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
    return response.status(200).json({data: 'Elemento eliminado'})
  }
}

module.exports = AsignaturaController
