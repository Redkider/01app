const store= new vuex.Store({
    state:{
        car:[] //购物车商品数据{ id,title,count,price,selected}
    },
    mutation:{
      addcar(state,goodsitem){ //加入购物车,把商品信息保存到store,  如果之前有此商品 只更新数量,如果没有则把信息添加进数组car中
          var flag=false  //假设在car中没有当前商品信息
          state.car.some(function (item) {
             if(item.id==goodsitem.id) {

                 item.count+=parseInt(goodsitem.count)
                 flag=true
                 return true

             }
          })
          if(!flag){
              state.car.push(goodsitem)
          }

      }
    },
    getter:{

    }

    })