Page({
  data: {
    name: '',
    tel: '',
    location: ''
  },
  onLoad() {},
  redirectToHome(){
    if(this.data.name && this.data.tel && this.data.location){
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
