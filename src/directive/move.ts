import type { App, Directive } from 'vue';
type moveActionType = (e: MouseEvent) => void;
type hooksType = (el: HTMLElement, binding: { value: moveActionType }) => void;
type vue2Directive = {
    inserted: hooksType
    unbind: hooksType
}

export const moveAction: () => (this: HTMLElement, e: MouseEvent) => void = () => {
    let originX = 0; // 记录上次移动的距离
    let originY = 0;

    return function mousedown(this, e) {
        
        if (e.type !== 'mousedown') return console.warn('toMove 必须注册为mousedown事件')
        let beginX = e.clientX; // 点击点在外部（例如文档）的坐标
        let beginY = e.clientY;
        let moveX = 0; // 每次鼠标移动的相对总距离
        let moveY = 0;

        const move = (e: MouseEvent) => {
            moveX = Math.floor(e.clientX - beginX + originX);
            moveY = Math.floor(e.clientY - beginY + originY);

            this.style.transform = `translate(${moveX}px, ${moveY}px)`
        }

        // 移除移动事件监听，移除监听移除移动的事件
        const removeEvent = () => {
            // 更新上次移动后的距离，就是translate后x、y的值，
            // 下次拖动调用move，在原来移动后的距离加上鼠标拖动距离，等于移动后的距离
            // 如果只是点击，调用move，moveX、moveY都是0
            if (moveX !== 0 && moveY !== 0) {
                originX = moveX;
                originY = moveY;
            }
            
            this.removeEventListener('mousemove', move);
            this.removeEventListener('mouseup', removeEvent);
            this.removeEventListener('mouseleave', removeEvent);
        }

        this.addEventListener('mousemove', move);
        // 松开鼠标和鼠标移出都需要清除事件
        this.addEventListener('mouseup', removeEvent);
        this.addEventListener('mouseleave', removeEvent); // mouseout会冒泡，即离开内部子元素也会触发
        e.preventDefault();
    }

}

const mounted: hooksType = (el, binding) => {
    el.addEventListener('mousedown', binding.value = moveAction())
}

const unmounted: hooksType = (el, binding) => {
    el.removeEventListener('mousedown', binding.value)
}

export const vMove: Directive<HTMLElement, moveActionType> = {
    mounted,
    unmounted
}

export const vMoveFor2: vue2Directive = {
    inserted: mounted,
    unbind: unmounted
}

export const movePlugin = {
    install(app: App) {
        const version = app.version.charAt(0)

        if (version === '2') {
            // @ts-ignore
            app.directive('move', vMoveFor2)
        }
        if (version === '3') {
            app.directive('move', vMove)
        }
    }
}