Page({
  data: {
    storeTitle: '',
    searchBarInput: '',
    store_items: [
      {id: '0', 
      title: 'Platos principales', 
      items: [
        {id: 0, name: 'Churrasco', desc: 'Churrasco con papas', price: '7500', img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/01/el-churrasco-que-es.jpg', cantidad: 0}, 
        {id: 1, name: 'Hamburguesa', desc: 'Hamburguesa con papas y bebida', price: '5500', img: 'https://www.saborusa.com/wp-content/uploads/2019/10/Rompe-la-rutina-con-una-suculenta-hamburguesa-con-queso-Foto-destacada.png', cantidad: 0}]
      }, 
      {id: '1', 
      title: 'Bebidas', 
      items: [
        {id: 2, name: 'Coca-Cola 400ml', desc: 'Coca-Cola 400ml', price: '2500', img: 'https://metrocolombiafood.vteximg.com.br/arquivos/ids/308035-750-750/7702535011089.jpg?v=637547053098970000', cantidad: 0}, 
        {id: 3, name: 'Limonada', desc: 'Limonado', price: '2500', img: 'https://www.pequerecetas.com/wp-content/uploads/2021/05/limonada-como-se-hace.jpg', cantidad: 0}]
      }
    ],
    error: ''
  },
  onLoad(query) {
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/PerfilTienda/tienda?codigo=${query.store}`,
      headers: {},
      method: 'GET',
      data: {},
      timeout: 30000,
      dataType: '',
      success: (result) => {
        this.setData({
          storeTitle: result.data[0].nombre
        })
      },
      fail: () => {
        this.setData({
          error: 'Error getting stores'
        })
      },
      complete: () => {
        
      }
    });
    my.request({
      url: `https://api-sabanadelivery.herokuapp.com/Item/buscar?codigo=${query.store}`,
      headers: {},
      method: 'GET',
      data: {},
      timeout: 30000,
      dataType: '',
      success: (result) => {
        this.setData({
          error: result.data.length > 0 ? '' : 'Lo sentimos, no hay tiendas disponibles por el momento.'
        })
      },
      fail: () => {
        this.setData({
          error: 'Error getting stores'
        })
      },
      complete: () => {
        
      }
    });
  },
  onChange(){
  },
  addToCart(e){
    let storeIndex = this.data.store_items.findIndex(obj => obj.id === e.currentTarget.dataset.storeId)
    let itemIndex = this.data.store_items[storeIndex].items.findIndex(obj => obj.id === e.currentTarget.dataset.itemId)
    let updatedItem = this.data.store_items[storeIndex].items[itemIndex]
    updatedItem.cantidad = updatedItem.cantidad + 1
    this.setData({
      store_items: [
        ...this.data.store_items.slice(0, storeIndex),
        this.data.store_items[storeIndex] = {...this.data.store_items[storeIndex], items: [...this.data.store_items[storeIndex].items.slice(0, itemIndex), updatedItem, ...this.data.store_items[storeIndex].items.slice(itemIndex+1)]},
        ...this.data.store_items.slice(storeIndex+1)
      ]
    })
  },
  removeFromCart(e){
    let storeIndex = this.data.store_items.findIndex(obj => obj.id === e.currentTarget.dataset.storeId)
    let itemIndex = this.data.store_items[storeIndex].items.findIndex(obj => obj.id === e.currentTarget.dataset.itemId)
    let updatedItem = this.data.store_items[storeIndex].items[itemIndex]
    updatedItem.cantidad = updatedItem.cantidad - 1
    this.setData({
      store_items: [
        ...this.data.store_items.slice(0, storeIndex),
        this.data.store_items[storeIndex] = {...this.data.store_items[storeIndex], items: [...this.data.store_items[storeIndex].items.slice(0, itemIndex), updatedItem, ...this.data.store_items[storeIndex].items.slice(itemIndex+1)]},
        ...this.data.store_items.slice(storeIndex+1)
      ]
    })
  },
  redirectToHome(){
    my.redirectTo({
      url: '/pages/Home/Home'
    });
  },
  redirectToCart(){
    my.redirectTo({
      url: '/pages/Cart/Cart'
    })
  },
  redirectToHistory(){
    my.redirectTo({
      url: '/pages/History/History'
    })
  }
});
