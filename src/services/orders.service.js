
export const orderService = {
    query,
    getOrderById,
    saveOrder,
    removeOrder,
    getEmptyOrder
}
const orders = require('./orders.json')

function query() {
    return orders;
}

function getOrderById(id) {
    const orderIdx = orders.findIndex(order => order.order_ID == id)
    if (orderIdx > -1) return orders[orderIdx];
    console.log('Error while getting order with id: ', id);
}

function saveOrder(orderToSave){
    if(!orderToSave) return
    const orders = query()
    const orderIdx = orders.findIndex(order => order.order_ID == orderToSave.order_ID)
    if(orderIdx > -1) orders[orderIdx] = orderToSave;
    else orders.push(orderToSave)
    return orders;
}

function removeOrder(id){
    const orders = query()
    const orderIdx = orders.findIndex(order => order.order_ID == id)
    orders.splice(orderIdx, 1)
    return orders;
}
function getEmptyOrder(){
    let keys = Object.getOwnPropertyNames(orders[0])
    let obj = {}
    for(let key in keys){
        obj[keys[key]] = null
    }
    let newDate = new Date()
    obj['order_ID'] = _makeId(10)
    obj['created_at'] =newDate.toISOString().split('T')[0] + ' ' + new Date().toISOString().substr(11, 8);
    return obj
}

function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}