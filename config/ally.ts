import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'

const allyConfig = defineConfig({
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID'),
    clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
    // callbackUrl: 'https://f98c-83-197-168-58.ngrok-free.app/auth/login/callback/google',
    callbackUrl: 'http://localhost:3333/auth/login/callback/google',
    prompt: 'select_account',
    accessType: 'offline',
    display: 'page',
    scopes: ['userinfo.email'],
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
