import { PropsWithChildren } from 'react'
// import { Header } from './header'

interface LayoutProps {}
export function Layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <main>
      {/* <Header /> */}
      {children}
    </main>
  )
}
