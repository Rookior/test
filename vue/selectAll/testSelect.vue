<template>
  <SelectWithVirtualScroll
    :selectVal.sync="selectedUnits"
    :option-list="unitList"
    :has-all="true"
    :virtual-scroll="true"
    @change="onSelectionChange"
    labelField="displayName"
  />
</template>

<script>
import SelectWithVirtualScroll from './ccSelectAll.vue'

export default {
  components: { SelectWithVirtualScroll },
  data() {
    return {
      selectedUnits: [],
      unitList: [
        { key: 'u1', alias: '单位A', displayName:'AAA' },
        { key: 'u2', alias: '单位B',displayName:'BBB' },
        { key: 'u3', alias: '单位C',displayName:'CCC' }
      ]
    }
  },
  methods: {
    onSelectionChange(val) {
      console.log('选中值:', val)
    }
  }
}
</script>