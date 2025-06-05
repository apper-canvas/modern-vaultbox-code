import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = ({ onDocumentUpload, categories = [] }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    issueDate: '',
    expiryDate: ''
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFileSelection(files[0])
  }

  const handleFileSelection = (file) => {
    if (!file) return

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload only PDF, JPG, or PNG files')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setFormData(prev => ({
      ...prev,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      category: categories[0]?.name || 'Others'
    }))
    setShowModal(true)
  }

  const handleUpload = async () => {
    if (!selectedFile || !formData.title || !formData.category) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 30
      })
    }, 200)

    try {
      await onDocumentUpload(selectedFile, formData)
      setUploadProgress(100)
      
      // Close modal after successful upload
      setTimeout(() => {
        setShowModal(false)
        setSelectedFile(null)
        setFormData({
          title: '',
          description: '',
          category: '',
          issueDate: '',
          expiryDate: ''
        })
        setUploadProgress(0)
      }, 1000)
    } catch (error) {
      toast.error('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      clearInterval(progressInterval)
    }
  }

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

  return (
    <>
      {/* Upload Zone */}
      <motion.div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'upload-zone-active'
            : 'border-surface-300 hover:border-primary/50 hover:bg-primary/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileSelection(e.target.files[0])}
          className="hidden"
        />

        <div className="space-y-4">
          <motion.div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors ${
              isDragging ? 'bg-primary text-white' : 'bg-surface-200 text-gray-500'
            }`}
            animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ApperIcon name="CloudUpload" size={32} />
          </motion.div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Your Documents
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF, JPG, and PNG files up to 10MB
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <ApperIcon name="Plus" size={16} />
              <span>Choose Files</span>
            </button>
            
            <button
              title="Document templates arriving in v2.0"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <ApperIcon name="FileTemplate" size={16} />
              <span>Use Template</span>
            </button>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="mt-8 pt-6 border-t border-surface-200">
          <p className="text-sm text-gray-500 mb-3">Quick categories:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.slice(0, 5).map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-surface-100 text-gray-700 rounded-lg text-sm hover:bg-surface-200 transition-colors cursor-pointer"
              >
                <ApperIcon name={getCategoryIcon(category.name)} size={14} />
                <span>{category.name}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => !isUploading && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-surface-200">
                <h3 className="text-lg font-semibold text-gray-900">Upload Document</h3>
                {!isUploading && (
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* File Preview */}
                <div className="flex items-center space-x-4 p-4 bg-surface-50 rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon 
                      name={selectedFile?.type.includes('pdf') ? 'FileText' : 'Image'} 
                      size={20} 
                      className="text-primary" 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{selectedFile?.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedFile?.size ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                    </p>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Uploading...</span>
                      <span className="text-primary font-medium">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="w-full bg-surface-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Enter document title"
                      disabled={isUploading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      disabled={isUploading}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      rows={3}
                      placeholder="Optional description"
                      disabled={isUploading}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        disabled={isUploading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        disabled={isUploading}
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-surface-200">
                  {!isUploading && (
                    <button
                      onClick={() => setShowModal(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={handleUpload}
                    disabled={isUploading || !formData.title || !formData.category}
                    className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Upload" size={16} />
                        <span>Upload Document</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MainFeature