Page({
  data: {
    items: [
        {id: 0, name: 'Churrasco', desc: 'Churrasco con papas', price: '7500', img: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2019/01/el-churrasco-que-es.jpg', cantidad: 0}, 
        {id: 1, name: 'Hamburguesa', desc: 'Hamburguesa con papas y bebida', price: '5500', img: 'https://www.saborusa.com/wp-content/uploads/2019/10/Rompe-la-rutina-con-una-suculenta-hamburguesa-con-queso-Foto-destacada.png', cantidad: 0},
        {id: 2, name: 'Coca-Cola 400ml', desc: 'Coca-Cola 400ml', price: '2500', img: 'https://metrocolombiafood.vteximg.com.br/arquivos/ids/308035-750-750/7702535011089.jpg?v=637547053098970000', cantidad: 0}, 
        {id: 3, name: 'Limonada', desc: 'Limonado', price: '2500', img: 'https://www.pequerecetas.com/wp-content/uploads/2021/05/limonada-como-se-hace.jpg', cantidad: 0}
    ]
  },
  onLoad() {},
  redirectToHome(){
    my.redirectTo({
      url: '/pages/Home/Home'
    });
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
});
