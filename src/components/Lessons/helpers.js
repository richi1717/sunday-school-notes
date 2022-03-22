export const filterByDate = (currentLessons) => {
  const arr = Object.entries(currentLessons)
  const obj = {}

  arr.forEach((item) => {
    const date = new Date(Number(item[0]))?.toLocaleDateString()
    if (!obj[date]) {
      obj[date] = []
    }
    obj[date].push(item)
  })

  return Object.keys(obj).map((item) => ({ date: item, notes: obj[item] }))
}
