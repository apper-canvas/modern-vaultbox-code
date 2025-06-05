import categoryData from '../mockData/categories.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let categories = [...categoryData]

export const getAll = async () => {
  await delay(200)
  return [...categories]
}

export const getById = async (id) => {
  await delay(150)
  const category = categories.find(cat => cat.id === id)
  if (!category) {
    throw new Error('Category not found')
  }
  return { ...category }
}

export const create = async (categoryData) => {
  await delay(300)
  const newCategory = {
    ...categoryData,
    id: Date.now(),
    documentCount: 0
  }
  categories = [...categories, newCategory]
  return { ...newCategory }
}

export const update = async (id, categoryData) => {
  await delay(250)
  const index = categories.findIndex(cat => cat.id === id)
  if (index === -1) {
    throw new Error('Category not found')
  }
  categories[index] = { ...categories[index], ...categoryData }
  return { ...categories[index] }
}

export const delete = async (id) => {
  await delay(200)
  const index = categories.findIndex(cat => cat.id === id)
  if (index === -1) {
    throw new Error('Category not found')
  }
  categories = categories.filter(cat => cat.id !== id)
  return true
}