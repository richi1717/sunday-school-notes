export const filterByDate = (currentLessons) => {
  const arr = Object.entries(currentLessons)
  const obj = {}

  arr.forEach((item) => {
    const chapter = item[0]?.split('-')?.[1]
    if (!obj[chapter]) {
      obj[chapter] = []
    }
    obj[chapter].push(item)
  })

  return Object.keys(obj).map((item) => ({ date: item, notes: obj[item] }))
}
