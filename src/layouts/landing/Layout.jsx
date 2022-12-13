import { Outlet } from 'react-router-dom'

const Layout = (props) => {
  return (
    <>
      <main className='landing-layout'>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  )
}

export default Layout