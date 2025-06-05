import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import * as documentService from '../services/api/documentService'
import * as categoryService from '../services/api/categoryService'

const Home = () => {
  const [documents, setDocuments] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [docsResult, catsResult] = await Promise.all([
          documentService.getAll(),
          categoryService.getAll()
        ])
        setDocuments(docsResult || [])
        setCategories(catsResult || [])
      } catch (err) {
        setError(err?.message || 'Failed to load data')
        toast.error('Failed to load documents')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleDocumentUpload = async (file, metadata) => {
    try {
      const newDocument = await documentService.create({
        title: metadata.title,
        description: metadata.description,
        category: metadata.category,
        fileUrl: URL.createObjectURL(file),
        fileType: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'jpg' : 'png',
        uploadDate: new Date().toISOString(),
        issueDate: metadata.issueDate,
        expiryDate: metadata.expiryDate,
        thumbnailUrl: URL.createObjectURL(file),
        fileSize: file.size
      })
      setDocuments(prev => [newDocument, ...prev])
      toast.success('Document uploaded successfully!')
    } catch (err) {
      toast.error('Failed to upload document')
    }
  }

  const handleDocumentDelete = async (id) => {
    try {
      await documentService.delete(id)
      setDocuments(prev => prev.filter(doc => doc.id !== id))
      setSelectedDocument(null)
      toast.success('Document deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete document')
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesSearch = doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'IDs': 'CreditCard',
      'Education': 'GraduationCap',
      'Finance': 'DollarSign',
      'Medical': 'Heart',
      'Others': 'Folder'
    }
    return iconMap[categoryName] || 'Folder'
  }

  const getCategoryColor = (categoryName) => {
    const colorMap = {
      'IDs': 'bg-purple-100 text-purple-700 border-purple-200',
      'Education': 'bg-blue-100 text-blue-700 border-blue-200',
      'Finance': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Medical': 'bg-red-100 text-red-700 border-red-200',
      'Others': 'bg-gray-100 text-gray-700 border-gray-200'
    }
    return colorMap[categoryName] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-white border-b border-surface-200 sticky top-0 z-40 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
              >
                <ApperIcon name="Menu" size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Shield" size={18} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">VaultBox</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
              <div className="relative">
                <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                title="Notifications (coming soon)"
                className="p-2 rounded-lg hover:bg-surface-100 transition-colors relative"
              >
                <ApperIcon name="Bell" size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <button
                title="Settings (coming soon)"
                className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
              >
                <ApperIcon name="Settings" size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : '-100%' }}
          className="fixed md:static top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-white border-r border-surface-200 z-30 md:z-0 md:translate-x-0 transition-transform duration-300 overflow-y-auto"
        >
          <div className="p-6">
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
                <nav className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-white transform translate-x-1'
                        : 'hover:bg-surface-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="FolderOpen" size={18} />
                      <span className="font-medium">All Documents</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === 'all' ? 'bg-white/20' : 'bg-surface-200'
                    }`}>
                      {documents.length}
                    </span>
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.name)
                        setSidebarOpen(false)
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-primary text-white transform translate-x-1'
                          : 'hover:bg-surface-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <ApperIcon name={getCategoryIcon(category.name)} size={18} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        selectedCategory === category.name ? 'bg-white/20' : 'bg-surface-200'
                      }`}>
                        {documents.filter(doc => doc.category === category.name).length}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tags Placeholder */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</h3>
                <button className="w-full flex items-center justify-center px-3 py-2 border-2 border-dashed border-surface-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors">
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  <span className="text-sm">Custom tags in development</span>
                </button>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0 p-6">
          {/* Upload Section */}
          <div className="mb-8">
            <MainFeature onDocumentUpload={handleDocumentUpload} categories={categories} />
          </div>

          {/* Document Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'All Documents' : selectedCategory}
              </h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
                </span>
                <button
                  title="Bulk actions coming soon!"
                  className="btn-secondary text-sm"
                >
                  <ApperIcon name="CheckSquare" size={16} className="mr-2" />
                  Select All
                </button>
              </div>
            </div>

            {loading ? (
              <div className="document-grid gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="card p-4 space-y-3">
                    <div className="aspect-video bg-surface-200 rounded-lg skeleton"></div>
                    <div className="h-4 bg-surface-200 rounded skeleton"></div>
                    <div className="h-3 bg-surface-200 rounded w-2/3 skeleton"></div>
                  </div>
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="FileX" size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-500">
                  {searchQuery ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
                </p>
              </div>
            ) : (
              <div className="document-grid gap-6">
                {filteredDocuments.map((document) => (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card card-hover p-4 group cursor-pointer"
                    onClick={() => setSelectedDocument(document)}
                  >
                    <div className="aspect-video bg-surface-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {document.fileType === 'pdf' ? (
                        <ApperIcon name="FileText" size={32} className="text-gray-400" />
                      ) : (
                        <img
                          src={document.thumbnailUrl}
                          alt={document.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 truncate">{document.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(document.category)}`}>
                        {document.category}
                      </span>
                      <p className="text-xs text-gray-500">
                        {new Date(document.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDocument(document)
                          }}
                          className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white transition-colors"
                          title="Preview"
                        >
                          <ApperIcon name="Eye" size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDocumentDelete(document.id)
                          }}
                          className="p-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <ApperIcon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDocument(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden backdrop-blur-glass"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-surface-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedDocument.title}</h3>
                  <p className="text-sm text-gray-500">{selectedDocument.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    title="Document sharing launching next month"
                    className="btn-secondary"
                  >
                    <ApperIcon name="Share2" size={16} className="mr-2" />
                    Share
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = selectedDocument.fileUrl
                      link.download = selectedDocument.title
                      link.click()
                    }}
                  >
                    <ApperIcon name="Download" size={16} className="mr-2" />
                    Download
                  </button>
                  <button
                    onClick={() => setSelectedDocument(null)}
                    className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="bg-surface-50 rounded-xl p-8 flex items-center justify-center min-h-96">
                  {selectedDocument.fileType === 'pdf' ? (
                    <div className="text-center">
                      <ApperIcon name="FileText" size={64} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">PDF Preview</p>
                      <p className="text-sm text-gray-500 mt-2">Full PDF viewer coming soon</p>
                    </div>
                  ) : (
                    <img
                      src={selectedDocument.thumbnailUrl}
                      alt={selectedDocument.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
                
                {selectedDocument.description && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedDocument.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home