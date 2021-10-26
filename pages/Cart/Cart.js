Page({
  data: {
  },
  onLoad() {
    let storageItems = my.getStorageSync({
      key: 'itemsTienda'
    });
    if(storageItems.data){
      for (let i = 0; i < storageItems.data.length; i++) {
        storageItems.data[i].id = i
      }
      this.setData({
        items: storageItems.data
      })
    }
    
    
  },
  formatItems(){
    let formattedItems = []
    if(this.data.items){
      for (let i = 0; i < this.data.items.length; i++) {
        if (this.data.items[i].cantidad > 0) {
          formattedItems.push(this.data.items[i])
        }
      }
    }
    return formattedItems
  },
  addToCart(e){
    let itemIndex = this.data.items.findIndex(obj => obj.id === e.currentTarget.dataset.itemId)
    let updatedItem = this.data.items[itemIndex]
    updatedItem.cantidad = updatedItem.cantidad + 1
    this.setData({
      items: [
        ...this.data.items.slice(0, itemIndex), 
        updatedItem, 
        ...this.data.items.slice(itemIndex+1)
      ],
    })
  },
  removeFromCart(e){
    let itemIndex = this.data.items.findIndex(obj => obj.id === e.currentTarget.dataset.itemId)
    let updatedItem = this.data.items[itemIndex]
    updatedItem.cantidad = updatedItem.cantidad - 1
    this.setData({
      items: [
        ...this.data.items.slice(0, itemIndex), 
        updatedItem, 
        ...this.data.items.slice(itemIndex+1)
      ],
    })
  },
  redirectToHome(){
    let itemsData = this.formatItems()
    my.setStorageSync({
      key: 'itemsTienda',
      data: itemsData
    });
    my.redirectTo({
      url: '/pages/Home/Home'
    });
  },
  redirectToStore(){
    let itemsData = this.formatItems()
    my.setStorageSync({
      key: 'itemsTienda',
      data: itemsData
    });
    my.redirectTo({
      url: this.data.items ? `/pages/Store/Store?store=${this.data.items[0].codigoTienda}` : '/pages/Home/Home'
    });
  },
  redirectToLogin(){
    let itemsData = this.formatItems()
    my.setStorageSync({
      key: 'itemsTienda',
      data: itemsData
    });
  },
  redirectToHistory(){
    let itemsData = this.formatItems()
    my.setStorageSync({
      key: 'itemsTienda',
      data: itemsData
    });
    my.redirectTo({
      url: '/pages/History/History'
    })
  }
});
