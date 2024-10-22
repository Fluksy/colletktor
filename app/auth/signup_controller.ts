import User from '#models/user'
import { type HttpContext } from '@adonisjs/core/http'

export default class SignupController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/signup')
  }

  async execute({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
