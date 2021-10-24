Page({
  data: {
    clave: '',
    telefono: '',
  },
  onLoad() {},
  redirectToHome(){
    if(this.data.clave && this.data.telefono){
      my.redirectTo({
        url: '/pages/Home/Home'
      })
    }
    else{
      my.alert({title: 'Oops', content: 'Por favor completa todos los campos'});
    }
    
  },
  updateInfo(e){
    this.setData({
      ...this.data,
      [e.target.dataset.id]: e.detail.value
    })
  }
});
