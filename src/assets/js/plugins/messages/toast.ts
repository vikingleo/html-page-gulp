enum EDirection {
    top = 'top',
    right = 'right',
    bottom = 'bottom',
    left = 'left'
}

interface IConfig {
    // 方向
    direction: string
    // 持续时间，展示后的保持时间
    duration: number
    // 动画时间
    speed: number

}

export class Toast {
    constructor(config: IConfig) {

    }

    /**
     * 初始化
     */
    init(): void {

        // 创建css外部文件调用
        let headEle = document.getElementsByName('head')
        let scriptNode = document.createElement('link')
        scriptNode.setAttribute('href', './css/style.css')
        headEle[0].appendChild(scriptNode)

    }
}

