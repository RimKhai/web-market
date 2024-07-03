export const vClickOutside = {
    mounted(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event)
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el, binding, vnode) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    }
}
