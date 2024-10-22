/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import User from '#models/user'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const LoginController = () => import('../app/auth/login_controller.js')
const SignupController = () => import('../app/auth/signup_controller.js')

router
  .group(() => {
    router.get('/', ({ response }) => response.redirect('auth.login'))
    router.get('/login', [LoginController, 'render']).as('auth.login')
    router.get('/signup', [SignupController, 'render']).as('auth.signup')
  })
  .use(middleware.guest())

// router.get('/login', [LoginController, 'render']).as('auth.login')
// router.get('/signup', [SignupController, 'render']).as('auth.signup')

router
  .get('/dashboard', ({ inertia }) => {
    return inertia.render('home')
  })
  .use(middleware.auth())

/*
|--------------------------------------------------------------------------
| Social routes
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// we redirect to google to login
router.get('/auth/login/redirect/google', ({ ally }) => {
  const google = ally.use('google')
  return google.redirect()
})

// we redirect from google to login
router.get('/auth/login/callback/google', async ({ ally, response, auth }) => {
  const google = ally.use('google')

  /**
   * User has denied access by canceling
   * the login flow
   */
  if (google.accessDenied()) {
    console.error('access denied')
    return response.redirect('/login')
  }

  /**
   * OAuth state verification failed. This happens when the
   * CSRF cookie gets expired.
   */
  if (google.stateMisMatch()) {
    console.error('state mis match')
    return response.redirect('/login')
  }

  /**
   * GitHub responded with some error
   */
  if (google.hasError()) {
    console.error('has error')
    return response.redirect('/login')
  }

  /**
   * Access user info
   */
  const user = await google.user()
  if (user.emailVerificationState !== 'verified') {
    return response.redirect('/login')
  }

  const dbUser = await User.firstOrCreate({ email: user.email })
  await auth.use('web').login(dbUser)
  return response.redirect('/dashboard')
})
