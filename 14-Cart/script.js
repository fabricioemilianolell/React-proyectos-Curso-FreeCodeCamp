
const cartItems = [
    {
      id: 1,
      title: 'Samsung Galaxy S7',
      price: 599.99,
      img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
      amount: 1,
    },
    {
      id: 2,
      title: 'google pixel ',
      price: 499.99,
      img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
      amount: 1,
    },
    {
      id: 3,
      title: 'Xiaomi Redmi Note 2',
      price: 699.99,
      img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
      amount: 1,
    },
  ];

  const url = 'https://course-api.com/react-useReducer-cart-project'



  

  
  //CONTEXT HOOKS
  const AppContext = React.createContext()

  const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0,

  }
  
  
  const AppProvider = ({ children }) => {

    //USE REDUCER HOOKS
    const [state, dispatch] = React.useReducer(reducer,initialState)

    //limpiar todos los items
    const clearcart = () => {
      dispatch({ type:"CLEAR_CART" })
    }

    //remover cada items individual
    const remove = (id) => {
      dispatch({ type:"REMOVE",payload: id })
    }

    //incrementar cada items
    const increment = (id) => {
      dispatch({ type:"INCREASE",payload: id })
    }

    //decrementa cada items
    const decrement = (id) => {
      dispatch({ type:"DECREASE",payload: id })
    }

    const fetchData = async () => {
      dispatch({type:"LOADING"})
      const response = await fetch(url)
      const data = await response.json()
      dispatch({type:"DISPLAY_ITEMS",payload:data})
    }

    React.useEffect(() => {
      fetchData()
    }, [])
    

    //efecto - reduce - total
    React.useEffect(() => {
      dispatch( {type:"GET_TOTALS"} )
    }, [state.cart])




    return <AppContext.Provider
              value={{
                ...state,
                clearcart,
                remove,
                increment,
                decrement
                }}>
            {children}
           </AppContext.Provider>
  }

    //CUSTOM HOOKS 
  // const AppContextCustom = () => {
  //   return useContext(AppContext)
  // }


  
  //FUNCIÓN REDUCER
  const reducer = (state,action) => {
    
    if(action.type === "CLEAR_CART") {
      return { ...state,cart: [] }
    }
    
    if(action.type === "REMOVE") {
      return { ...state, cart: state.cart.filter(el => {
        if(el.id !== action.payload) {
          return el
        }
      })}
    } 
    
    if(action.type === "INCREASE" ) {
      let tempCart = state.cart.map(el => {
        if(el.id === action.payload) {
          return { ...el,amount: el.amount + 1 }
        }
        return el
      });
      return {...state, cart: tempCart}
    }

    if(action.type === "DECREASE" ) {
      let tempCart = state.cart.map(el => {
        if(el.id === action.payload) {
          return { ...el,amount: el.amount - 1 }
        }
        return el
      }).filter(el => el.amount !== 0)
      return {...state, cart: tempCart}
    }

    if(action.type === "GET_TOTALS") {
      let {total,amount} = state.cart.reduce( (acc,el) => {
        const {price,amount} = el;
        const itemTotal = price * amount;

        acc.total += itemTotal
        acc.amount += amount
        return acc
      }, {
        total:0,
        amount:0  
      })
      total = parseFloat(total.toFixed(2))

      return {...state,total,amount}
    }

    if(action.type === "LOADING") {
        return {...state,loading: true}
    }

    if(action.type === "DISPLAY_ITEMS") {
      return { ...state,cart: action.payload,loading:false }
    }

    return state
  }
  
  
  
  const Navbar = () => {

    const { amount } = React.useContext(AppContext)

    return (
      <nav>
        <div className="nav-center">
        <h3>useReducer</h3>
        <div className="nav-container">
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M16 6v2h2l2 12H0L2 8h2V6a6 6 0 1 1 12 0zm-2 0a4 4 0 1 0-8 0v2h8V6zM4 10v2h2v-2H4zm10 0v2h2v-2h-2z' />
          </svg>
        <div className="amount-container">
          <p className="total-amount">{amount}</p>
        </div>
       </div>
       </div>
      </nav>
    )
  }
  


  
   const CartContainer = () => {
    
    const { cart,total,clearcart } = React.useContext(AppContext)

    if(cart.length === 0) {
      return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
      )
    }

    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
        </header>
        <div>
          {
            cart.map(el => {
              return <CartItem key={el.id} {...el} />
            })
          }
        </div>
        <footer>
          <hr/>
            <div className="cart-total">
              <h4>total <span>${total}</span> </h4>
            </div>
            <button className="btn clear-btn" onClick={clearcart}>Clear cart</button>
        </footer>
      </section>
    )
  }
  


  //Componente de cada items (celular)
  const CartItem = ({ id,title,price,img,amount }) => {

    const { remove,increment,decrement }  = React.useContext(AppContext)

    return (
      <article className="cart-item">
        <img src={img} alt={title} />
        <div>
          <h4>{title}</h4>
          <h4 className="item-price">${price}</h4>
          <button className="remove-btn" onClick={() => remove(id) }>remove</button>
        </div>
        <div>
          <button className="amount-btn" onClick={()=> increment(id) }>+</button>
          <p className="amount">{amount}</p>
          <button className="amount-btn" onClick={()=> decrement(id) }>-</button>
        </div>
      </article>
    )
  }
  
  

  
  const App = () => {

      const { loading } = React.useContext(AppContext)


    if (loading) {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )
    }

    return (
      <main>
            <Navbar/>
            <CartContainer/>
      </main>
    )
  }
  


  
  const RenderApp = () => {

    return (
      <AppProvider>
        <App />
      </AppProvider>
    )
  }
  


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RenderApp />)