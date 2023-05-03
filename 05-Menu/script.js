
const data = [
    {
      id: 1,
      title: 'buttermilk pancakes',
      category: 'breakfast',
      price: 15.99,
      img: 'https://sugarspunrun.com/wp-content/uploads/2019/03/Best-buttermilk-pancake-recipe-11-of-16.jpg',
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: 'diner double',
      category: 'lunch',
      price: 13.99,
      img: "https://media-cdn.tripadvisor.com/media/photo-m/1280/1c/99/ab/41/america-s-diner-double.jpg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: 'godzilla milkshake',
      category: 'shakes',
      price: 6.99,
      img: 'https://mangalorecookbook.files.wordpress.com/2017/01/milo_godzilla.jpg',
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: 'country delight',
      category: 'breakfast',
      price: 20.99,
      img: 'https://media.licdn.com/dms/image/C5612AQFZ24FP-EV1rg/article-inline_image-shrink_1500_2232/0/1620578564594?e=1682553600&v=beta&t=vcF0nM1pv0FMggPndd2s4GAflBsSmT_iXbz90hsNRbg',
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: 'egg attack',
      category: 'lunch',
      price: 22.99,
      img: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/12027/d02feeb0-8e73-48fb-946f-5c01d1813a41.png',
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: 'oreo dream',
      category: 'shakes',
      price: 18.99,
      img: 'https://olo-images-live.imgix.net/6a/6ad164f8f1e74418809e66e0da4fad99.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=eba0332952087ca8bbca5f34403ecd0a',
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 7,
      title: 'bacon overflow',
      category: 'breakfast',
      price: 8.99,
      img: 'https://external-preview.redd.it/H5wUsbQwYSKQYxJII7ARXb6Jvk_-Xb30tyjbwf_MuZU.jpg?width=640&crop=smart&auto=webp&s=27dd2ccf6e6a691dcb41360b83d193952e9e7870',
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 8,
      title: 'american classic',
      category: 'lunch',
      price: 12.99,
      img: 'https://img.theculturetrip.com/wp-content/uploads/2017/05/nathans.jpg',
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
      id: 9,
      title: 'quarantine buddy',
      category: 'shakes',
      price: 16.99,
      img: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/01/mac-and-cheese-on-plate.jpg',
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
  ];



  
const Categorias = ( {filterMenuItems,categories} ) => {

    return (
      <div className="btn-container">
        {
          categories.map( (el,index) => {
            return <button 
            type="button" 
            key={index}
            className="filter-btn"
            onClick={ () => filterMenuItems(el)} >
              {el}
              </button>
          })
        }
      </div>
    )
  }

  
  const Menu = ({ item }) => {
  
    return (
      <div className="section-center">
        {
            item.map(el => {
                const {id,title,price,img,desc} = el;
                
                return <article key={id} className="menu-item">
                    <img src={img} alt={title} className="photo"></img>
                    <div className="item-info">
                        <header>
                            <h4>{title}</h4>
                            <h5 className="price">{price}</h5>
                            <p className="item-text">{desc}</p>
                        </header>
                    </div>
                </article>
            })
        }
      </div>
    )
  }
  
  const allCategories = ["all", ...new Set(data.map(el => el.category))];
  

const App = () => {

    const [item, setItem] = React.useState(data);
    const [categories, setCategories] = React.useState(allCategories);

    const filterMenuItems = (categoria) => {
        if(categoria === "all") {
            return setItem(data)
        }
        const NewItems = data.filter(el => el.category === categoria)
        setItem(NewItems)
    }

    return (
    <main>
        <section className="menu section">
            <div className="title">
                <h2>our menu</h2>
                <div className="underline"></div>
            </div>
            <Categorias categories={categories} filterMenuItems={filterMenuItems} />
            <Menu item={item} />
        </section>
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)