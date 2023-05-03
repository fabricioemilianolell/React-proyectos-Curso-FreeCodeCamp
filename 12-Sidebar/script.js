
const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
    icon: "+",
  },
  {
    id: 2,
    url: '/team',
    text: 'team',
    icon: "+",
  },
  {
    id: 3,
    url: '/projects',
    text: 'projects',
    icon: "+",
  },
  {
    id: 4,
    url: '/calendar',
    text: 'calendar',
    icon: "+",
  },
  {
    id: 5,
    url: '/documents',
    text: 'documents',
    icon: "+",
  },
];

const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: "+",
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: "+",
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon:  "+",
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: "+",
  },
  {
    id: 5,
    url: 'https://www.twitter.com',
    icon: "+",
  },
];

// CONTEXT
const AppContext = React.createContext()

const ProviderContext = ( {children} ) => {

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  }
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  
  return  <AppContext.Provider 
            value={{
              sidebarOpen,
              modalOpen,
              openSidebar,
              closeSidebar,
              openModal,
              closeModal
            }} >
            {children}
          </AppContext.Provider>
}

//CUSTOM HOOKS
// const UseCustomGlobalContext = () => {
//   return React.useContext(AppContext)
// }


const Home = () => {

  const { openSidebar,openModal } = React.useContext(AppContext);

  // //custom hooks Context
  // const dataContext = CustomGlobalContext()
  // console.log(dataContext)

  return (
    <main>
       <button className="sidebar-toggle" onClick={openSidebar}>X</button>
       <button className="btn" onClick={openModal}>Show Modal</button>
    </main>
  )
}



const Modal = () => {

  const { modalOpen, closeModal } = React.useContext(AppContext)

  return (
    <div className={`${modalOpen ? "modal-overlay show-modal" : "modal-overlay"}`}>
      <div className="modal-container">
        <h3>Modal content</h3>
        <button className="close-modal-btn" onClick={closeModal}>X</button>
      </div>
    </div>
  )
}



const Sidebar = () => {

  const { sidebarOpen, closeSidebar } = React.useContext(AppContext)

  return (
    <aside className={`${sidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <div>Coding Addict</div>
        <button className="close-btn" onClick={closeSidebar}>
          X
        </button>
      </div>
      <ul className="links">
        {
          links.map(el => {
            const { id,url,text,icon } = el;
            return <li key={id}>
              <a href={url}>
                {icon}
                {text}
              </a>
            </li>
          })
        }
      </ul>
      <ul className="social-icons">
        {
          social.map(el => {
            const { id,url,icon } = el;
            return <li key={id}>
              <a href={url}>
                {icon}
              </a>
            </li>
          })
        }
      </ul>
    </aside>
  )
}



const App = () => {
  return (
    <ProviderContext>
        <Home/>
        <Modal/>
        <Sidebar/>
    </ProviderContext>
    
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)