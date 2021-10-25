Page({
  data: {
    storeTitle: '',
    searchBarInput: '',
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
        if(result.data.length > 0) {
          this.updateItems(result.data)
        }
        
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
  group(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },
  updateItems(data){
    let updatedItems = []
    let groupedItems = Object.values(this.group(data, "categoria"))
    for (let i = 0; i < groupedItems.length; i++) {
      for (let j = 0; j < groupedItems[i].length; j++) {
        groupedItems[i][j] = {...groupedItems[i][j], id: j, cantidad: 0}
      }
    }
    for (let i = 0; i < groupedItems.length; i++) {
      updatedItems[i] = {id: i, title: groupedItems[i][0].categoria, items: groupedItems[i]}
    }
    this.setData({
      store_items: updatedItems
    })
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
