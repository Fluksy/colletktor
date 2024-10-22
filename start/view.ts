import router from '@adonisjs/core/services/router'

export function route(...args: Parameters<typeof router.makeUrl>) {
  return router.makeUrl(...args)
}
