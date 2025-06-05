import documentData from '../mockData/documents.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let documents = [...documentData]

export const getAll = async () => {
  await delay(300)
  return [...documents]
}

export const getById = async (id) => {
  await delay(200)
  const document = documents.find(doc => doc.id === id)
  if (!document) {
    throw new Error('Document not found')
  }
  return { ...document }
}

export const create = async (documentData) => {
  await delay(400)
  const newDocument = {
    ...documentData,
    id: Date.now(),
    uploadDate: new Date().toISOString()
  }
  documents = [newDocument, ...documents]
  return { ...newDocument }
}

export const update = async (id, documentData) => {
  await delay(300)
  const index = documents.findIndex(doc => doc.id === id)
  if (index === -1) {
    throw new Error('Document not found')
  }
  documents[index] = { ...documents[index], ...documentData }
  return { ...documents[index] }
}

export const delete = async (id) => {
  await delay(250)
  const index = documents.findIndex(doc => doc.id === id)
  if (index === -1) {
    throw new Error('Document not found')
  }
  documents = documents.filter(doc => doc.id !== id)
  return true
}