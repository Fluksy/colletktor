import { createInertiaApp } from '@inertiajs/react'
import ReactDOMServer from 'react-dom/server'
import { Layout } from '~/components/layouts/app'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages: any = import.meta.glob('../pages/**/*.tsx', { eager: true })
      page = pages[`../pages/${name}.tsx`]
      page.default.layout = page.default.layout || ((page: any) => <Layout>{page}</Layout>)
      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
