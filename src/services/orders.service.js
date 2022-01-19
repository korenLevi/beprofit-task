// import axios from 'axios';
import {httpService}  from './httpService'
export const orderService = {
    query,
    getOrderById,
    saveOrder,
    removeOrder,
    getEmptyOrder,

}
const orders = require('./orders.json')
const URL = 'https://www.become.co/api/rest/test.php';

function query() {
    return orders;
}

async function getOrderById(id) {
    try{
        const res = await httpService.get(URL)
        if(!res.success) throw res
        const orderIdx = orders.findIndex(order => order.order_ID == id)
        if (orderIdx > -1) return orders[orderIdx];
    }catch(err){
        console.log('Had Error while getting order',err)
        throw err
    }
}

async function saveOrder(orderToSave) {
    try{
        if (!orderToSave) return
        const res = await httpService.post(URL)
        if(!res.success) throw res
        const orderIdx = orders.findIndex(order => order.order_ID == orderToSave.order_ID)
        if (orderIdx > -1) orders[orderIdx] = orderToSave;
        else orders.push(orderToSave)
        return orders;
    }catch(err){
        console.log('Had Error while saving order',err)
        throw err
    }
}

 async function removeOrder(id) {
    try{
        const res = await httpService.delete(URL)
        if(!res.success) throw res
        const orderIdx = orders.findIndex(order => order.order_ID == id)
        orders.splice(orderIdx, 1)
        return orders;
    }catch(err){
        console.log('Had Error while removing order',err);
        throw err
    }
}

function getEmptyOrder() {
    let keys = Object.getOwnPropertyNames(orders[0])
    let obj = {}
    for (let key in keys) {
        obj[keys[key]] = null
    }
    let newDate = new Date()
    obj['order_ID'] = _makeId(10)
    obj['created_at'] = newDate.toISOString().split('T')[0] + ' ' + new Date().toISOString().substr(11, 8);
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

