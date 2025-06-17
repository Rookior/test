<template>
    <div
      class="draggable-container"
      :style="{ top: position.y + 'px', left: position.x + 'px' }"
      @mousedown="startDragging"
    >
      <div class="handle">
        <!-- 插槽：用户可以自定义标题栏或拖动区域 -->
        <slot name="header">
          <div class="default-header">拖我</div>
        </slot>
      </div>

      <!-- 插槽：主体内容 -->
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      isDragging: false,
      position: {
        x: 100,
        y: 100
      },
      offset: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    startDragging (e) {
      const container = e.currentTarget
      this.offset.x = e.clientX - container.offsetLeft
      this.offset.y = e.clientY - container.offsetTop

      this.isDragging = true

      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.stopDragging)
    },
    onMouseMove (e) {
      if (this.isDragging) {
        this.position.x = e.clientX - this.offset.x
        this.position.y = e.clientY - this.offset.y
      }
    },
    stopDragging () {
      this.isDragging = false

      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.stopDragging)
    }
  }
}
</script>

  <style scoped>
  .draggable-container {
    position: absolute;
    width: 300px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: move;
  }

  .handle {
    padding: 10px;
    background-color: #f0f0f0;
    cursor: move;
  }

  .default-header {
    font-weight: bold;
    text-align: center;
  }

  .content {
    padding: 10px;
  }
  </style>
