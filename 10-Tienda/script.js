

const Alerta = ( { mensaje,typeAlert,manejarAlerta,arrLista }) => {

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      manejarAlerta()
    }, 3000);
  
    return () => {
      clearTimeout(timeout)
    }
  }, [arrLista])
  

  return (
    <p className={`alert alert-${typeAlert}`}>{mensaje}</p>
  )
}


const Lista = ( {arrLista, removerItems, editarItems } ) => {

  return (
    <div className="grocery-list">
      {
       arrLista.map(el => {
        const {id,title} = el;
          return <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <button type="button" className="edit-btn"
            onClick={() => editarItems(id)}>+</button>
            <button type="button" className="delete-btn" 
            onClick={() => removerItems(id)}>-</button>
          </article>
       }) 
      }
    </div>
  )
}

const getLocalStorage = () => {
  let lista = localStorage.getItem("arrLista");
  if(lista) {
    return JSON.parse(localStorage.getItem("arrLista"))
  }
  else {
    return []
  }
}

const App = () => {

    const [name, setName] = React.useState("");
    const [arrLista, setArrLista] = React.useState(getLocalStorage());
    const [editando, setEditando] = React.useState(false);
    const [editarID, setEditarID] = React.useState(null);
    const [alerta, setAlerta] = React.useState({
      mostrar: false, 
      mensaje: "", 
      typeAlert:""
    });

    const admSubmit = (e) => {
        e.preventDefault();
        
        if(!name) {
            // mostrar alerta
          manejarAlerta(true,"Poner valor","danger")
        }
        else if(name && editando) {
            setArrLista(arrLista.map(el => {
              if(el.id === editarID) {
                return { ...el,title:name }
              }
              return el
            }))
  
        setName("")
        setEditarID(null)
        setEditando(false)
        manejarAlerta(true,"El valor ha cambiado","success")
      }else {
          manejarAlerta(true,"item añadido a la lista","success")
          const items = { id: new Date().getTime().toString(), title: name }
          setArrLista([...arrLista,items])
          setName("")
        }
    }

    const manejarAlerta = (mostrar= false, mensaje= "", typeAlert = "" ) => {
      setAlerta({
        mostrar,
        mensaje,
        typeAlert
      })
    }

    const limpiarLista = () => {
      manejarAlerta(true,"lista vacia","danger");
      setArrLista([]);
    }

    const removerItems = (id) => {
      manejarAlerta(true,"items removido","danger");
      setArrLista(arrLista.filter(el => el.id !== id ))

    }

    const editarItems = (id) => {
      const items = arrLista.find(el => el.id === id)
      setEditando(true)
      setEditarID(id)
      setName(items,title)
    }

    React.useEffect(() => {
      localStorage.setItem("arrLista",JSON.stringify(arrLista))
      
    }, [arrLista])
    

  return (
    <section className="section-center">
        <form className="grocery-form" onSubmit={admSubmit}>
            {
              alerta.mostrar && <Alerta {...alerta} 
              manejarAlerta={manejarAlerta} arrLista={arrLista} />  
            }
            <h3>grocery bud</h3>
            <div className="form-control">
                <input type="text" className="grocery" placeholder="eggs" 
                value={name} onChange={ (e) => setName(e.target.value)}></input>
                <button type="submit" className="submit-btn">
                    {
                        editando ? "editar" : "submit"
                    }
                </button>
            </div>
        </form>
        {
          arrLista.length > 0 &&
          <div className="grocery-container">
            <Lista arrLista={arrLista} removerItems={removerItems}
            editarItems={editarItems} />
            <button className="clear-btn" onClick={limpiarLista}>Limpiar Items</button>
        </div>
        }
        
    </section>
  )
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)