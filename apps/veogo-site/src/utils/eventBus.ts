import {EventEmitter} from "events"

// 导入事件总线,利用这个对象发射和监听事件,这个对象是全局的
const eventBus = new EventEmitter()

// 事件类型
export const eventTypes = {
    OpenLoginModal: Symbol('OpenLoginModal'),
    OpenPricingModal: Symbol('OpenPricingModal'),
}


export default eventBus
