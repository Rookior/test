<%--陕西区域集控发电量--%>
    <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
        <%@ include file="/WEB-INF/views/common/meta.jsp" %>
            <!-- $("#mainContainer").load(format_url('/areaHome/realListSXGS')); -->
            <style>
                #realListSXGS {
                    color: white;
                    height: 100%;
                    padding: 15px;
                    box-sizing: border-box;
                }

                .section_main {
                    width: 100%;
                    height: calc(100% - 3.85vw);
                    display: flex;
                    flex-direction: column;
                }

                .section_main_top .el-select {
                    width: 220px;
                }

                .section_main_top {
                    text-align: right;
                    padding: 10px 0;
                    width: 100%;
                    font-size: 16px;
                    padding: 20px;
                    background-color: #102938;
                }

                .section_main_table {
                    flex: 1;
                    height: 0;
                }
            </style>
            <div id="realListSXGS">
                <section class="section_main">
                    <section class="section_main_top">
                        <div style="display: flex;justify-content: space-between;">
                            <div class="yn-flex yn-flex-middle yn-flex-center">
                                <div class="yn-mr10">能源类型</div>
                                <div class="yn-mr20">
                                    <el-select @change="resetSelectFarms" placeholder="全部" size="small"
                                        v-model="selectFarmType" collapse-tags multiple clearable>
                                        <el-option label="风电" value="WT"></el-option>
                                        <el-option label="光伏" value="PV"></el-option>
                                    </el-select>
                                </div>
                                <div class="yn-mr10">电站名称</div>
                                <div class="yn-mr20">
                                    <el-select size="small" v-model="selectFarms" collapse-tags
                                        multiple placeholder="全部" clearable>
                                        <el-option v-for="option in farmOptions" :key="option.farmName"
                                            :label="option.alias" :value="option.farmName" />
                                    </el-select>
                                </div>

                            </div>
                        </div>
                    </section>
                    <section class="section_main_table cc-table">
                        <el-table :data="tableData" :span-method="objectSpanMethod" @sort-change="handleSortChange"
                            style="width: 100%" height="auto">
                            <template v-for="item in defaultTableColumn">
                                <!-- 标准状态 -->
                                <el-table-column :label="item.label" :prop="item.prop" :width="item.width"
                                    :sortable="item.sortable" :min-width="item.minWidth" align="center">
                                </el-table-column>
                            </template>
                        </el-table>
                    </section>
                </section>
            </div>

            <script src="${ctx}/static/js/vue.js?0820"></script>
            <link rel="stylesheet" href="${ctx}/static/js/elementUI/theme-chalk/index.css" type=" text/css" />
            <link rel="stylesheet" href="${ctx}/static/js/elementUI/theme-chalk/cover-element.css" type=" text/css" />
            <script src="${ctx}/static/js/elementUI/index.js?0820"></script>
            <script>
                var realListSXGS = new Vue({
                    el: '#realListSXGS',
                    name: 'realListSXGS',
                    data () {
                        return {
                            timer: null,
                            selectFarmType: '',
                            selectFarms: [],
                            wtFarmList: [],
                            pvFarmList: [],
                            defaultTableColumn: [
                                { prop: 'farmType', label: '分组' },
                                { prop: 'farmDesc', label: '电站名称' },
                                { label: '电站容量(MW)', prop: 'capacity', sortable: true },
                                { label: '实时功率(MW)', prop: 'CMPT_OutPower', sortable: true },
                                { label: '日发电量(kWh)', prop: 'CMPT_Production_Day', sortable: true },
                                { label: '月发电量(kWh)', prop: 'CMPT_Production_Month', sortable: true },
                                { label: '年发电量(kWh)', prop: 'CMPT_Production_Year', sortable: true },
                                { label: '环境参数(辐照度/风速)', prop: 'environment', sortable: true }
                            ],
                            tableData: [],
                            displayedData: [],
                            // 新增：存储当前排序状态
                            sortProp: null,
                            sortOrder: null
                        }
                    },

                    computed: {
                        farmOptions () {
                            return this.selectFarmType == 'WT' ? this.wtFarmList : this.selectFarmType == 'PV' ? this.pvFarmList : [].concat(this.wtFarmList).concat(this.pvFarmList)
                        }
                    },
                    async created () {
                        await this.getFarmsOptions()
                        this.getTableData()
                        this.setTimer(this.getTableData)
                    },
                    methods: {
                        async getFarmsOptions () {
                            const that = this
                            try {
                                const [wtResult, pvResult] = await Promise.all([
                                    $.ajax({
                                        type: 'GET',
                                        dataType: 'JSON',
                                        url: format_url('/windreal/getFarmsWT')
                                    }),
                                    $.ajax({
                                        type: 'GET',
                                        dataType: 'JSON',
                                        url: format_url('/boxTransformerPV/getFarmsPV')
                                    })
                                ])
                                that.wtFarmList = wtResult
                                that.pvFarmList = pvResult
                            } catch (error) {
                                console.log('获取场站数据失败:', error)
                            }
                        },
                        resetSelectFarms () {
                            this.selectFarms = []
                        },
                        // 修复：保存排序状态
                        handleSortChange ({ prop, order }) {
                            this.sortProp = prop
                            this.sortOrder = order

                            let sorted = [...this.tableData]
                            if (order === 'ascending') {
                                sorted.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))
                            } else if (order === 'descending') {
                                sorted.sort((a, b) => (a[prop] < b[prop] ? 1 : -1))
                            } else {
                                sorted = [...this.tableData] // 取消排序
                            }
                            this.displayedData = sorted
                        },

                        objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
                            if (columnIndex !== 0) return { rowspan: 1, colspan: 1 }
                            const list = this.displayedData || []
                            const field = 'farmType'
                            if (rowIndex > 0 && list[rowIndex - 1] && list[rowIndex - 1][field] === row[field]) {
                                return { rowspan: 0, colspan: 0 }
                            }
                            let rowspan = 1
                            for (let i = rowIndex + 1; i < list.length; i++) {
                                if (list[i][field] === row[field]) {
                                    rowspan++
                                } else {
                                    break
                                }
                            }
                            return { rowspan, colspan: 1 }
                        },
                        // 修复：更新数据时应用当前排序状态
                        async getTableData () {
                            const that = this
                            const params = {
                                farmIds: this.selectFarms?.length ? this.selectFarms.join(',') : this.farmOptions.map(e=>e.farmName)
                            }
                            $.ajax({
                                type: 'GET',
                                dataType: 'JSON',
                                url: format_url('/areaHome/getRealTableData?farmIds= ' + params.farmIds),
                                success: function (result) {
                                    const wtArr = result.filter(e => e.farmType === 'WT').map(e => ({
                                        ...e,
                                        environment: e.CMPT_WindSpeed_Avg, // || Math.ceil(Math.random() * 100),
                                        farmType: '风电场',
                                        capacity: e.capacity * 1,
                                        CMPT_OutPower: e.CMPT_OutPower * 1,
                                        CMPT_Production_Day: e.CMPT_Production_Day * 1,
                                        CMPT_Production_Month: e.CMPT_Production_Month * 1,
                                        CMPT_Production_Year: e.CMPT_Production_Year * 1
                                    }))
                                    const pvArr = result.filter(e => e.farmType === "PV").map(e => ({
                                        ...e,
                                        environment: e.CMPT_Radiation, // || Math.ceil(Math.random() * 100),
                                        farmType: '光伏电站',
                                        capacity: e.capacity * 1,
                                        CMPT_OutPower: e.CMPT_OutPower * 1,
                                        CMPT_Production_Day: e.CMPT_Production_Day * 1,
                                        CMPT_Production_Month: e.CMPT_Production_Month * 1,
                                        CMPT_Production_Year: e.CMPT_Production_Year * 1
                                    }))

                                    that.tableData = [...wtArr, ...pvArr]

                                    // 修复：根据当前排序状态重新排序
                                    if (that.sortProp) {
                                        let sorted = [...that.tableData]
                                        if (that.sortOrder === 'ascending') {
                                            sorted.sort((a, b) => (a[that.sortProp] > b[that.sortProp] ? 1 : -1))
                                        } else if (that.sortOrder === 'descending') {
                                            sorted.sort((a, b) => (a[that.sortProp] < b[that.sortProp] ? 1 : -1))
                                        }
                                        that.displayedData = sorted
                                    } else {
                                        that.displayedData = [...that.tableData]
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.log('获取表格数据失败:', error)
                                }
                            })
                        },
                        setTimer (fn) {
                            if (this.timer) return
                            this.timer = window.setInterval(() => {
                                if (!document.querySelector('#realListSXGS')) {
                                    this.removeTimer()
                                    return
                                }
                                fn && fn()
                            }, 1000 * 3)
                        },
                        removeTimer () {
                            window.clearInterval(this.timer)
                            this.timer = null
                            realListSXGS = null
                        }
                    }
                })
            </script>