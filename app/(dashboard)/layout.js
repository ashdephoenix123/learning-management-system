import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../global.scss'

export const metadata = {
  title: 'Anonymous University - User Dashboard',
  description: 'Enhance your organization\'s training and education initiatives with a comprehensive Learning Management System (LMS). Streamline course management, track progress, and engage learners with interactive features. Discover the power of an efficient LMS to drive knowledge retention, empower your workforce, and unlock their full potential.',
}

export default function RootLayout({ children }) {

  return (
      <section>
        <Navbar />
        <main className='container1'>
          <Sidebar />
          <section className='main-content'>
            <div className='font1 container3'>
              {children}
            </div>
            <Footer />
          </section>
        </main>
      </section>
  )
}