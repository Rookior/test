// 请求分组


/**
 * 将数组按指定数量分组
 * @param {Array} arr - 要分组的数组，如 stationKeys
 * @param {number} size - 每组的元素个数
 * @returns {Array} 分组后的二维数组
 */
function chunkArray (arr, size = 5) {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

function getDataApi (group) {
  console.log(`/api/stations?${group.join(',')}`)
  return new Promise(resolve => {
    setTimeout(() => {
      const value = group.map(stationKey => ({
        [stationKey]: Math.random()
      }))
      resolve(value)
    }, Math.random() * 1000 + 500)
  })
}
async function fetchGroup (group) {
  return await getDataApi(group)
  //   await new Promise(resolve => {
  //     setTimeout(() => {
  //       const value = group.map(stationKey => ({
  //         [stationKey]: Math.random()
  //       }))
  //       stationData = {
  //         ...stationData,
  //         ...Object.assign({}, ...value) // 合并新数据到 stationData
  //       }
  //       resolve(value)
  //     }, Math.random() * 1000 + 500) // 模拟请求延迟
  //   })

  //   const promises = group.map(stationKey =>
  //     // fetch(`/api/station?name=${stationKey}`)
  //     //   .then(res => res.json())
  //     //   .then(data => {
  //     //     // 局部更新 stationData
  //     //     stationData = {
  //     //       ...stationData,
  //     //       [stationKey]: data
  //     //     }
  //     //   })
  //     new Promise(resolve => {
  //       console.log(`请求: ${stationKey}`)
  //       setTimeout(() => {
  //         const value = Math.random()
  //         console.log(`返回: ${stationKey}`, value)
  //         stationData = {
  //           ...stationData,
  //           [stationKey]: value
  //         }
  //         resolve(value)
  //       }, Math.random() * 1000 + 500) // 模拟请求延迟
  //     })
  //   )

  //   await Promise.all(promises)
}

// async function loadStationDataInBatches2 (stationKeys, batchSize = 5) {
//   const groups = chunkArray(stationKeys, batchSize)
//   console.log('分组后的站点数据:', groups)
//   for (const group of groups) {
//     await fetchGroup(group) // 顺序批量请求
//   }
//   console.log('全部请求结束，最终数据结果:', stationData)
// }

// async function loadStationDataInBatches (stationKeys, batchSize = 5) {
//   const groups = chunkArray(stationKeys, batchSize)
//   console.log('分组后的站点数据:', groups)
//   // 并发请求所有分组
//   const promises = groups.map(group => fetchGroup(group))
//   await Promise.all(promises)
//   console.log('全部请求结束，最终数据结果:', stationData)
// }

async function loadStationDataInBatches (stationData = {}, stationKeys, batchSize = 5) {
  const groups = chunkArray(stationKeys, batchSize)
  console.log('分组后的站点数据:', groups)
  // 并发请求所有分组
  const promises = groups.map(async group => {
    const result = await fetchGroup(group)
    Object.assign(stationData, ...result)
  })
  await Promise.all(promises)
  console.log('全部请求结束，最终数据结果:', stationData)
}

// 示例调用

const stationData = {
  station20: 20
}
const stationKeys = ['station1', 'station2', 'station3', 'station4', 'station5', 'station6', 'station7', 'station8', 'station9', 'station10']
loadStationDataInBatches(stationData, stationKeys, 5)
