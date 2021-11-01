Page({
  data: {
    totalPrice: 0,
    latitude: 0,
    longitude: 0,
    locationDescription: ''
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
  },
  getLocationDetails(){
    let location = my.getLocation({
      success(res) {
        my.hideLoading();
        return res
    },
      fail() {
        my.hideLoading();
        my.alert({ title: 'location failed' });
      },
    }).then(i => {
      this.setData({
        latitude: i.latitude,
        longitude: i.longitude
      })
    })
    
  },
  createOrder(){
    my.request({
      url: 'https://api-sabanadelivery.herokuapp.com/Compra/realizarPedido',
      headers: {},
      method: 'POST',
      data: {
        codigoUsuario: my.getStorageSync({ key: 'codigoUsuario' }).data,
        codigoTienda: my.getStorageSync({ key: 'itemsTienda' }).data[0].codigoTienda,
        latitud: this.data.latitude,
        longitud: this.data.longitude,
        descripcion: this.data.locationDescription
      },
      timeout: 30000,
      dataType: '',
      success: (result) => {
        this.createOrderDetails(result.data.insertId)
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
  createOrderDetails(id){
    my.request({
      url: 'https://api-sabanadelivery.herokuapp.com/DetalleCompra/crear',
      headers: {},
      method: 'POST',
      data: {
        codigoCompra: id,
        listado: this.data.items.filter(i => i.cantidad > 0)
      },
      timeout: 30000,
      dataType: '',
      success: (result) => {
        my.removeStorageSync({
          key: 'itemsTienda'
        });
        my.alert({
          title: 'Completado!',
          content: 'Felicidades, tu compra esta completada, revisa tu historial para ver su estado.',
          buttonText: 'Ver historial',
          success: (result) => {
            my.redirectTo({
              url: '/pages/History/History'
            });
          },
        });
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
  llenarDesc(){
      my.alert({
        content:'Por favor describe el lugar en el que te encuentras!',
        buttonText: 'Aceptar',

      })

  },
  updateInfo(e){
    this.getLocationDetails()
    this.setData({
      locationDescription: e.detail.value
    })
  },
  confirmOrder(){
    if(this.data.totalPrice > 0 && this.data.latitud != 0 && this.data.longitude != 0 && this.data.locationDescription){
      this.createOrder()
    }
    else{
      this.llenarDesc()
    }
  }
});
