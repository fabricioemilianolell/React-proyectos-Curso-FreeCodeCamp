
const sublinks = [
  {
    page: 'products',
    links: [
      { label: 'payment', icon: "+", url: '/products' },
      { label: 'terminal', icon: "+", url: '/products' },
      { label: 'connect', icon: "+", url: '/products' },
    ],
  },
  {
    page: 'developers',
    links: [
      { label: 'plugins', icon: "+", url: '/products' },
      { label: 'libraries', icon: "+", url: '/products' },
      { label: 'help', icon: "+", url: '/products' },
      { label: 'billing', icon: "+", url: '/products' },
    ],
  },
  {
    page: 'company',
    links: [
      { label: 'about', icon: "+", url: '/products' },
      { label: 'customers', icon: "+", url: '/products' },
    ],
  },
];


//CONTEXT HOOK

const AppContext = React.createContext();

const ContextProvider = ( {children} ) => {

    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [submenuOpen, setSubmenuOpen] = React.useState(false);
    const [location, setLocation] = React.useState({}) 
    const [page, setPage] = React.useState({page:"",links:[]})

    const openSidebar = () => {
        setSidebarOpen(true)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    const openSubmenu = (text,coordinates) => {
        const page = sublinks.find(el => {
          if(el.page === text) {
            return el
          }
        })
        setPage(page)
        setLocation(coordinates)
        setSubmenuOpen(true)
    }

    const closeSubmenu = () => {
        setSubmenuOpen(false)
    }


    return <AppContext.Provider 
            value={{sidebarOpen,
                    submenuOpen,
                    openSidebar,
                    closeSidebar,
                    openSubmenu,
                    closeSubmenu,
                    location,
                    page}}>
                {children}
           </AppContext.Provider>
}


//CUSTOM HOOKS
// const CustomContext = () => {
//     return React.useContext(AppContext)
// }


const Navbar = () => {

    const {openSidebar,openSubmenu,closeSubmenu} = React.useContext(AppContext)

    const mostrarSubmenu = (e) => {
      const page = e.target.textContent;
      const tempBtn = e.target.getBoundingClientRect();
      //centro del btn
      const center = (tempBtn.left + tempBtn.right) / 2;
      const bottom = tempBtn.bottom - 3;
      openSubmenu(page,{center,bottom})
    }

    const handleSubmenu = (e) => {
      if(!e.target.classList.contains("link-btn")){
        closeSubmenu()
      }
    }

  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
        <div className="nav-center">
            <div className="nav-header">
                <p className="nav-logo">Stripe</p>
                <button className="btn toggle-btn" onClick={openSidebar}>
                    +
                </button>
            </div>
            <ul className="nav-links">
                <li>
                    <button className="link-btn" onMouseOver={mostrarSubmenu}>
                        products
                    </button>
                </li>
                <li>
                    <button className="link-btn" onMouseOver={mostrarSubmenu}>
                        developers
                    </button>
                </li>
                <li>
                    <button className="link-btn" onMouseOver={mostrarSubmenu}>
                        company
                    </button>
                </li>
            </ul>
            <button className="btn signin-btn">
                Sign in
            </button>
        </div>
    </nav>
  )
}



const Sidebar = () => {

    const {sidebarOpen,closeSidebar} = React.useContext(AppContext)

  return (
    <aside className={`${sidebarOpen ? "sidebar-wrapper show": "sidebar-wrapper"}`}>
        <div className="sidebar">
            <button className="close-btn" onClick={closeSidebar}>
                X
            </button>
            <div className="sidebar-links">
              {
                sublinks.map( (el,index) => {
                  const {page,links} = el;
                  return <article key={index}>
                            <h4>{page}</h4>
                            <div className="sidebar-sublinks">
                              {
                                links.map( (item,index) => {
                                  const {url,icon,label} = item;
                                  return <a key={index} href={url}>
                                            {icon}
                                            {label}
                                        </a>
                                })
                              }
                            </div>
                         </article>
                })
              }
            </div>
        </div>
    </aside>
  )
}



const Hero = () => {

    const {closeSubmenu} = React.useContext(AppContext)
  
return (
    <section className="hero" onMouseOver={closeSubmenu}>
        <div className="hero-center">
            <article className="hero-info">
                <h1>Payments infrastructure for the internet</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, ea!</p>
                <button className="btn">
                    Start now
                </button>
            </article>
            <article className="hero-images">
                {/* <img src="" alt></img> */}
            </article>
        </div>
    </section>
  )
}



const Submenu = () => {

  const { submenuOpen,location,page:{page,links} } = React.useContext(AppContext)
  const divContainerREF = React.useRef(null)
  const [columns, setColumns] = React.useState("col-2")

  React.useEffect(() => {
    setColumns("col-2")
    const submenu = divContainerREF.current;
    const {center,bottom} = location;
    submenu.style.left = `${center}px`
    submenu.style.top = `${bottom}px`
    
    if(links.length === 3){
      setColumns("col-3")
    }
    if(links.length > 3) {
      setColumns("col-4")
    }
  }, [location,links])
  
  return (
    <aside className={`${submenuOpen ? "submenu show" : "submenu"}`} ref={divContainerREF} >
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {
            links.map( (el,index) => {
              const {label,icon,url} = el;
              return <a key={index} href={url}>
                      {icon}
                      {label}
                     </a>
            })  
          }
        </div>
    </aside>
  )
}



const App = () => {

  return (

    <ContextProvider>
        <Navbar/>
        <Sidebar/>
        <Hero/>
        <Submenu/>
    </ContextProvider>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
