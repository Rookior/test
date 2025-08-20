import Vue from 'vue'
import store from '../store'

Vue.directive('openLineDialog', {
  bind (el) {
    el.ondblclick = e => {
      if (el.lineData.dev && el.lineData.tag) {
        if (['WTUR_TurStatusCN', 'WTUR_TurStatus', 'CMPT_StandardStatus', 'CMPT_StandardStatusCN'].includes(el.lineData.tag)) {
          store.commit('SET_TIMESTATUS_DIALOG_DATA', { flag: true, ...el.lineData })
        } else {
          store.commit('SET_LINE_DIALOG_DATA', { flag: true, ...el.lineData })
        }
      }
    }
  },
  update (el, binding) {
    if (binding.value) {
      // 屏蔽双击曲线点
      if (['CMPT_Capacity', 'capacity', 'CMPT_EsCapacity', 'CMPT_InstallNum', 'CMPT_RateOfProductionComplete_Month', 'CMPT_RateOfProductionComplete_Year', 'FJCJ', 'DEVICE_TYPE'].includes(binding?.value?.tag)) {
        return false
      } else {
        el.style.cursor = 'zoom-in'
      }
      el.lineData = binding.value
    }
  }
})

Vue.directive('watermark', (el, binding) => {
  function addWaterMarker (str, parentNode, textColor) { // 水印文字，父元素，字体，文字颜色
    var can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 300
    can.height = 200
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = '14px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.4)'
    cans.textAlign = 'center'
    cans.lineHegiht = 200
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 3, can.height * 0.46)
    cans.fillText('岳能科技', can.width / 3, can.height * 0.33)
    parentNode.style.width = '100%'
    parentNode.style.height = '100%'
    parentNode.style.zIndex = 9999
    // parentNode.style.opacity = opacity
    parentNode.style.top = 0
    parentNode.style.position = 'fixed'
    parentNode.style.pointerEvents = 'none'
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  }
  addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
})

Vue.directive('full', {
  bind (el, binding) {
    const setFullScreen = (isFull) => {
      if (isFull) {
        el.classList.add('v_full_screen')
      } else {
        el.classList.remove('v_full_screen')
      }
    }
    setFullScreen(binding.value)
    el._setFullScreen = setFullScreen
  },
  update (el, binding) {
    el._setFullScreen(binding.value)
  },
  unbind (el) {
    delete el._setFullScreen
  }
})

Vue.directive('context-menu', {
  bind(el, binding, vnode) {
    // 1. 验证绑定值
    if (!binding.value) {
      console.error('v-context-menu directive requires a binding value.')
      return
    }

    // 2. 提取组件传入的函数和参数
    const { onShowTrend, onShowCompare, params = {} } = binding.value

    // 3. 存储参数，供默认实现使用
    el._contextMenuParams = params

    // 4. 在指令内部实现默认的 "显示趋势" 功能
    const defaultOnShowTrend = () => {
      console.log('[指令默认] "显示趋势" 被触发')
      console.log('参数:', el._contextMenuParams)

      // 显示双击曲线弹窗
      store.commit('SET_LINE_DIALOG_DATA', { flag: true, ...el._contextMenuParams })

      // 默认行为: 触发一个自定义事件，让组件决定如何响应
      // const event = new CustomEvent('context-menu-trend', {
      //   detail: { ...el._contextMenuParams }
      // })
      // el.dispatchEvent(event)
    }

    // 5. 在指令内部实现默认的 "曲线对比" 功能
    const defaultOnShowCompare = () => {
      console.log('[指令默认] "曲线对比" 被触发')
      console.log('参数:', el._contextMenuParams)

      // 显示数据调阅列表
      store.commit('SET_TAGFAVORITESDIALOG_VISIBLE', true)
      store.commit('SET_LINE_DIALOG_DATA', { 
        flag: false, 
        ...el._contextMenuParams
      })
      
      
      // 默认行为: 触发一个自定义事件
      // const event = new CustomEvent('context-menu-compare', {
      //   detail: { ...el._contextMenuParams }
      // })
      // el.dispatchEvent(event)
    }

    // // 6. 决定最终使用的函数 (组件传入的优先级高于默认实现)
    // const finalOnShowTrend = typeof onShowTrend === 'function' ? onShowTrend : defaultOnShowTrend
    // const finalOnShowCompare = typeof onShowCompare === 'function' ? onShowCompare : defaultOnShowCompare

    // 7. 创建菜单的函数
    const createMenu = (x, y) => {
      if (el._contextMenu) {
        document.body.removeChild(el._contextMenu)
        el._contextMenu = null
      }

      const menu = document.createElement('div')
      menu.className = 'custom-context-menu'
      menu.style.cssText = `
        position: absolute; top: ${y}px; left: ${x}px; background: white; border: 1px solid #ccc;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.2); z-index: 1000; list-style: none; padding: 0; margin: 0;
        min-width: 120px; border-radius: 4px; overflow: hidden; font-family: Arial, sans-serif; font-size: 14px;
      `

      const addItem = (text, handler) => {
        const item = document.createElement('div')
        item.textContent = text
        item.style.cssText = 'padding: 8px 12px; cursor: pointer; transition: background-color 0.2s; border-bottom: 1px solid #eee; margin: 0;'
        item.addEventListener('mouseenter', () => item.style.backgroundColor = '#f0f0f0')
        item.addEventListener('mouseleave', () => item.style.backgroundColor = 'white')
        item.addEventListener('click', (e) => {
          e.stopPropagation()
          if (menu && menu.parentNode) document.body.removeChild(menu)
          el._contextMenu = null
          handler() // 执行最终确定的处理函数
        })
        menu.appendChild(item)
      }

      // 添加菜单项
      addItem('显示趋势', () => {
        // 对于 onShowCompare，无论使用哪个实现，都要传入 params
        // 如果是组件自定义的函数，它应该能接收 params
        // 如果是指令默认函数，它会使用 el._contextMenuParams
        if (typeof onShowTrend === 'function') {
          onShowTrend(params) // 传入 params 给组件函数
        } else {
          defaultOnShowTrend() // 使用默认函数 (内部已用 _contextMenuParams)
        }
      })

      addItem('曲线对比', () => {
        // 对于 onShowCompare，无论使用哪个实现，都要传入 params
        // 如果是组件自定义的函数，它应该能接收 params
        // 如果是指令默认函数，它会使用 el._contextMenuParams
        if (typeof onShowCompare === 'function') {
          onShowCompare(params) // 传入 params 给组件函数
        } else {
          defaultOnShowCompare() // 使用默认函数 (内部已用 _contextMenuParams)
        }
      })

      // 移除最后一个项目的下边框
      if (menu.children.length > 0) {
        menu.children[menu.children.length - 1].style.borderBottom = 'none'
      }

      document.body.appendChild(menu)
      el._contextMenu = menu

      // 8. 关闭菜单
      const closeMenu = (e) => {
        if (!menu.contains(e.target)) {
          if (menu && menu.parentNode) document.body.removeChild(menu)
          el._contextMenu = null
          document.removeEventListener('click', closeMenu)
          document.removeEventListener('contextmenu', closeMenu)
        }
      }

      setTimeout(() => {
        document.addEventListener('click', closeMenu)
        document.addEventListener('contextmenu', closeMenu)
      }, 0)
    }

    // 9. 右键点击事件处理
    const handleContextMenu = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const x = e.clientX
      const y = e.clientY
      const menuWidth = 140
      const menuHeight = 60
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      let posX = x
      let posY = y
      if (x + menuWidth > windowWidth) posX = windowWidth - menuWidth - 5
      if (y + menuHeight > windowHeight) posY = windowHeight - menuHeight - 5

      createMenu(posX, posY)
    }

    // 10. 绑定事件
    el.addEventListener('contextmenu', handleContextMenu)
    el._contextMenuHandler = handleContextMenu

    // 11. 存储信息用于解绑
    el._contextMenuBinding = binding.value // 保留引用
  },

  unbind(el) {
    if (el._contextMenuHandler) {
      el.removeEventListener('contextmenu', el._contextMenuHandler)
      el._contextMenuHandler = null
    }
    if (el._contextMenu) {
      if (el._contextMenu.parentNode) {
        document.body.removeChild(el._contextMenu)
      }
      el._contextMenu = null
    }
    el._contextMenuParams = null
    el._contextMenuBinding = null
  }
})