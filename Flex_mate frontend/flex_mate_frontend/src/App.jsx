import Navbar from './Navbar.jsx'
import Explore from './Explore.jsx'
import Hirefreelancers from './Hirefreelancers.jsx'
import Yourworks from './Yourworks.jsx'
import Workupdates from './Workupdates.jsx'
import Chatbox from './Vatchit.jsx'
import Portfolio from './Portfolio.jsx'
import Resume from './Resume.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Explore /></>
    },
    {
      path: "hirefreelancers",
      element: <><Navbar/><Hirefreelancers/></>
    },
    {
      path: "workupdates",
      element: <><Navbar/><Workupdates/></>
    },
    {
      path: "yourworks",
      element: <><Navbar/><Yourworks/></>
    },
    {
      path: "chatbox",
      element: <><Navbar/><Chatbox/></>
    },
    {
      path: "portfolio",
      element: <><Navbar/><Portfolio/></>
    },
    {
      path: "resume",
      element: <><Navbar/><Resume/></>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
