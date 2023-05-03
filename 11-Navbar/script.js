

const links = [
  {
    id: 1,
    url: '/',
    text: 'random',
  },
  {
    id: 2,
    url: '/about',
    text: 'about',
  },
  {
    id: 3,
    url: '/projects',
    text: 'projects',
  },
  {
    id: 4,
    url: '/contact',
    text: 'contact',
  },
  {
    id: 5,
    url: '/profile',
    text: 'profile',
  },
]

const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: "+"
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: "+"
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: "+"
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: "+"
  },
]




const Navbar = () => {
  
  const [mostrarLinks, setMostrarLinks] = React.useState(false);
  const LinksDivContainerRef = React.useRef(null);
  const LinksListaRef = React.useRef(null);
  
  React.useEffect(() => {
      const linksHeight = LinksListaRef.current.getBoundingClientRect().height
      if(mostrarLinks) {
        LinksDivContainerRef.current.style.height = `${linksHeight}px`
      } else {
          LinksDivContainerRef.current.style.height = "0px"
        }
  }, [mostrarLinks])
  

  return (
    <nav>
        <div className="nav-center">
            <div className="nav-header">
                <div style={{fontSize:"20px", color:`${mostrarLinks ? "blue" : ""}`}}>freeCodeCamp</div>
                <button className="nav-toggle" onClick={ () => (setMostrarLinks(!mostrarLinks)) }>X</button>
            </div>
            
                
                <div className="links-container" ref={LinksDivContainerRef}>
                  <ul className="links" ref={LinksListaRef}>
                  { links.map(el => {
                    return <li key={el.id}>
                              <a href={el.url}>{el.text}</a>
                           </li>
                  })
                }
                  </ul>
                </div>
                
                
            
            <ul className="social-icons">
              {
                social.map(el => {
                  const { id,url,icon } = el
                  return <li key={id}>
                            <a href={url}>{icon}</a>
                         </li>
                })
              }
            </ul>
        </div>
    </nav>
  )
}


const App = () => {

  return (
    <Navbar/>
  )
}



const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)