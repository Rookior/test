/**
 * ccSelectAll.vue
 * 
 * 一个基于 Element UI 的多选下拉组件，支持“全选”功能和虚拟滚动优化大数据列表。
 * 
 * Props:
 * - selectVal (Array): 当前选中的值，支持双向绑定，必填。
 * - optionList (Array): 下拉选项列表，必填。
 * - hasAll (Boolean): 是否显示“全选”选项，默认 true。
 * - virtualScroll (Boolean): 是否启用虚拟滚动，默认 false。
 * - labelField (String): 选项显示的字段名，默认 'alias'。
 * 
 * Data:
 * - itemComponent: 虚拟滚动时渲染的选项组件。
 * - selectUnits: 当前选中的选项集合。
 * - oldSelectUnits: 上一次选中的选项集合，用于判断全选逻辑。
 * 
 * Computed:
 * - optionListAll: 包含“全选”选项的完整列表。
 * - showAll: 是否显示“全选”选项。
 * 
 * Methods:
 * - visibleChange(val): 下拉框显示状态变化时重置虚拟列表。
 * - update(val, oldVal): 根据传入值同步选中项，处理全选逻辑。
 * - changeSelect(val): 处理选中项变化，支持全选和取消全选。
 * - selectOutOfVisibleVal(val): 处理选中项不在可见列表中的情况。
 * 
 * 生命周期:
 * - mounted: 初始化时同步 selectVal 的值。
 * 
 * 事件:
 * - update:selectVal: 选中项变化时触发，返回去除“全选”后的选中项。
 * - change: 选中项变化时触发，返回去除“全选”后的选中项。
 * 
 * 依赖:
 * - vue-virtual-scroll-list: 用于虚拟滚动优化大数据列表渲染。
 * - Element UI 的 el-select 和 el-option 组件。
 */
<template>
  <!-- 
    多选下拉组件主体
    collapseTags: 多选时将选中值折叠显示
    filterable: 支持搜索过滤
    multiple: 多选模式
    clearable: 支持一键清空
    value-key: 指定选项的唯一标识字段
    size: 组件尺寸
  -->
  <el-select
    :collapseTags="true"
    filterable
    multiple
    clearable
    value-key="key"
    v-model="selectUnits"
    size="mini"
    @change="changeSelect"
    @visible-change="visibleChange"
  >
    <!-- 全选选项，仅在hasAll为true且有选项时显示 -->
    <el-option label="全选" value="ALL_SELECT" v-if="showAll" />
    
    <!-- 虚拟滚动模式：用于大数据量优化，只渲染可见区域的选项 -->
    <template v-if="virtualScroll">
      <virtual-list
        ref="virtualList"
        data-key="key"
        :data-sources="optionList"
        :keeps="12"
        :data-component="itemComponent"
        :extra-props="{
          label: labelField
        }"
        style="height: 200px; overflow-y: auto;"
      >
      </virtual-list>
    </template>
    
    <!-- 普通模式：直接渲染所有选项 -->
    <template v-else>
      <el-option
        v-for="item in optionList"
        :key="item.key"
        :label="item[labelField]"
        :value="item"
      />
    </template>
  </el-select>
</template>

<script>
// 导入虚拟滚动组件，用于优化大数据量列表的渲染性能
import VirtualList from 'vue-virtual-scroll-list'

/**
 * 虚拟滚动选项组件
 * 用于在虚拟滚动模式下渲染单个选项
 */
const VirtualOptionItem = {
  props: {
    // 选项数据源
    source: {
      type: Object
    },
    // 显示标签的字段名
    label: {
      type: String,
      default: 'alias'
    }
  },
  /**
   * 渲染函数
   * @param {Function} h - Vue的createElement函数
   * @returns {VNode} 返回el-option虚拟节点
   */
  render(h) {
    return h('el-option', {
      props: {
        label: this.source[this.label], // 显示文本
        value: this.source              // 选项值（整个对象）
      }
    })
  }
}

export default {
  // 注册组件
  components: { VirtualList },
  
  // 组件属性定义
  props: {
    // 当前选中的值数组，支持v-model双向绑定
    selectVal: {
      type: Array,
      require: true,
      default: () => []
    },
    // 下拉选项列表，每个选项应包含key字段作为唯一标识
    optionList: {
      type: Array,
      require: true
    },
    // 是否显示"全选"选项
    hasAll: {
      type: Boolean,
      default: true
    },
    // 是否启用虚拟滚动（适用于大数据量场景）
    virtualScroll: {
      type: Boolean,
      default: false
    },
    // 选项显示文本的字段名
    labelField: {
      type: String,
      default: 'alias'
    }
  },
  data () {
    return {
      // 虚拟滚动时使用的选项组件
      itemComponent: VirtualOptionItem,
      // 当前选中的选项集合（内部状态）
      selectUnits: [],
      // 上一次选中的选项集合，用于全选逻辑判断
      oldSelectUnits: []
    }
  },
  // 计算属性
  computed: {
    /**
     * 包含"全选"选项的完整列表
     * @returns {Array} 如果hasAll为true，返回包含'ALL_SELECT'的完整列表，否则返回原列表
     */
    optionListAll () {
      if (this.hasAll) {
        return ['ALL_SELECT'].concat(this.optionList)
      } else {
        return this.optionList
      }
    },
    /**
     * 是否显示"全选"选项
     * @returns {Boolean} 当hasAll为true且有选项时返回true
     */
    showAll(){
      return this.hasAll && this.optionList.length
    }
  },
  // 过滤器（当前为空）
  filters: {},
  
  // 监听器
  watch: {
    // 监听外部传入的selectVal变化，同步到内部状态
    selectVal: {
      handler (val, oldVal) {
        this.update(val, this.oldSelectUnits)
      },
      deep: true // 深度监听数组变化
    }
  },
  // 方法集合
  methods: {
    /**
     * 下拉框显示状态变化时的处理
     * @param {Boolean} val - 是否显示下拉框
     */
    visibleChange(val){
      // 重置虚拟列表的滚动位置
      this.$refs.virtualList && this.$refs.virtualList.reset()
    },
    
    /**
     * 根据传入值更新选中状态
     * @param {Array} val - 新的选中值数组
     * @param {Array} oldVal - 旧的选中值数组
     */
    update (val, oldVal) {
      // 如果没有选项，清空选中状态
      if (this.optionList.length < 1) {
        this.selectUnits = []
        return
      }
      
      if (this.hasAll === true) {
        // 如果上次选择了全选，且当前值与上次相同，则保持全选状态
        if (oldVal.includes('ALL_SELECT') && JSON.stringify(oldVal) === JSON.stringify(val)) {
          this.selectUnits = this.optionListAll
          this.oldSelectUnits = this.optionListAll
        } 
        // 如果选中的项目数等于总数减1（除了全选），自动选中全选
        else if (val.length === this.optionListAll.length - 1) {
          this.selectUnits = this.optionListAll
          this.oldSelectUnits = this.optionListAll
        } 
        // 其他情况直接使用传入值
        else {
          this.selectUnits = val
          this.oldSelectUnits = val
        }
      } else {
        // 不支持全选时直接使用传入值
        this.selectUnits = val
      }
    },
    /**
     * 处理选中项变化的核心方法
     * @param {Array} val - 当前选中的值数组
     */
    changeSelect (val) {
      // 如果没有选项，直接返回
      if (this.optionList.length < 1) {
        return
      }
      
      if (this.hasAll === true) {
        // 构建包含全选的完整值数组
        const allValues = []
        for (const item of ['ALL_SELECT'].concat(this.optionList)) {
          allValues.push(item)
        }
        
        // 获取上一次的选中值
        const oldVal = this.oldSelectUnits.length > 0 ? this.oldSelectUnits : []
        
        // 情况1：点击了全选选项
        if (val.includes('ALL_SELECT')) {
          this.selectUnits = allValues
        }
        
        // 情况2：取消全选（上次有全选，当前没有全选）
        if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
          this.selectUnits = []
        }
        
        // 情况3：在全选状态下点击某个具体选项（取消该选项）
        if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
          const index = val.indexOf('ALL_SELECT')
          val.splice(index, 1) // 移除全选选项
          this.selectUnits = val
        }
        
        // 情况4：非全选状态下，选中了所有具体选项，自动添加全选
        if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
          if (val.length === allValues.length - 1) {
            this.selectUnits = ['ALL_SELECT'].concat(val)
          }
        }
        
        // 保存当前状态作为下次比较的基准
        this.oldSelectUnits = this.selectUnits.map(item => item)
        
        // 向外部发送事件，过滤掉'ALL_SELECT'标识
        const emitValue = this.selectUnits.filter(item => item !== 'ALL_SELECT')
        this.$emit('update:selectVal', emitValue)
        this.$emit('change', emitValue)
      } else {
        // 不支持全选时，直接发送选中值
        this.$emit('update:selectVal', this.selectUnits)
        this.$emit('change', this.selectUnits)
      }
    },
    /**
     * 处理选中项不在当前可见列表中的情况
     * 临时将选中项添加到列表开头，然后在下一个tick中移除
     * @param {Array} val - 需要显示的选中值数组
     */
    selectOutOfVisibleVal(val = []){
      if(val.length) {
        // 临时将第一个选中项添加到选项列表开头
        this.optionList.unshift(val[0])
        this.selectUnits = val
        
        // 在下一个DOM更新周期后移除临时添加的项
        this.$nextTick(()=>{
          this.optionList.shift(0)
        })
      }
    }
  },
  // 生命周期钩子
  
  /**
   * 组件创建完成
   * 可以访问当前this实例，但DOM还未挂载
   */
  created () {
    // 当前为空实现
  },
  
  /**
   * 组件挂载完成
   * 可以访问DOM元素，进行初始化操作
   */
  mounted () {
    // 初始化时同步外部传入的selectVal值到内部状态
    this.update(this.selectVal, [])
  },
  
  // 其他生命周期钩子（当前为空实现）
  beforeCreate () { },  // 组件创建之前
  beforeMount () { },   // 组件挂载之前
  beforeUpdate () { },  // 组件更新之前
  updated () { },       // 组件更新之后
  beforeDestroy () { }, // 组件销毁之前
  destroyed () { },     // 组件销毁完成
  activated () { }       // keep-alive组件激活时触发
}
</script>
<style lang='scss' scoped>
/* 
  组件样式
  scoped: 样式仅作用于当前组件
  lang='scss': 使用SCSS预处理器
*/

/* 可以在这里引入公共CSS类 */
/* @import url(); */

/* 当前组件暂无自定义样式 */
</style>
