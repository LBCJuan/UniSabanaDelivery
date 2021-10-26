Page({
  data: {
    totalPrice: 0
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
        items: storageItems.data,
      })
      this.calculateTotalPrice()
    }
  },
  calculateTotalPrice(){
    let total = 0
    if(this.data.items && this.data.items.length > 0 ){
      for (let i = 0; i < this.data.items.length; i++) {
        total += this.data.items[i].precio * this.data.items[i].cantidad
      }
    }
    this.setData({
      ...this.data,
      totalPrice: total
    })
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
    this.saveOnStorage()
    this.calculateTotalPrice()
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
    this.saveOnStorage()
    this.calculateTotalPrice()
  },
  saveOnStorage(){
    let itemsData = this.formatItems()
    if(itemsData.length > 0){
      my.setStorageSync({
        key: 'itemsTienda',
        data: itemsData
      });
    }
    else{
      my.removeStorageSync({
        key: 'itemsTienda'
      });
    }
  },
  redirectToHome(){
    my.redirectTo({
      url: '/pages/Home/Home'
    });
  },
  redirectToStore(){
    my.redirectTo({
      url: this.data.items ? `/pages/Store/Store?store=${this.data.items[0].codigoTienda}` : '/pages/Home/Home'
    });
  },
  redirectToLogin(){
  },
  redirectToHistory(){
    my.redirectTo({
      url: '/pages/History/History'
    })
  }
});
