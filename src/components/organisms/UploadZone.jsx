import { useState, useRef } from 'react';
      import { motion } from 'framer-motion';
      import { toast } from 'react-toastify';
      import ApperIcon from '../ApperIcon';
      import Button from '../atoms/Button';
      import Text from '../atoms/Text';
      
      const UploadZone = ({ onFileSelected, categories = [] }) => {
        const [isDragging, setIsDragging] = useState(false);
        const fileInputRef = useRef(null);
      
        const handleDragOver = (e) => {
          e.preventDefault();
          setIsDragging(true);
        };
      
        const handleDragLeave = (e) => {
          e.preventDefault();
          setIsDragging(false);
        };
      
        const handleDrop = (e) => {
          e.preventDefault();
          setIsDragging(false);
      
          const files = Array.from(e.dataTransfer.files);
          handleFileSelection(files[0]);
        };
      
        const handleFileSelection = (file) => {
          if (!file) return;
      
          const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
          if (!allowedTypes.includes(file.type)) {
            toast.error('Please upload only PDF, JPG, or PNG files');
            return;
          }
      
          if (file.size > 10 * 1024 * 1024) { // 10MB limit
            toast.error('File size must be less than 10MB');
            return;
          }
      
          onFileSelected(file);
        };
      
        const getCategoryIcon = (categoryName) => {
          const iconMap = {
            'IDs': 'CreditCard',
            'Education': 'GraduationCap',
            'Finance': 'DollarSign',
            'Medical': 'Heart',
            'Others': 'Folder'
          };
          return iconMap[categoryName] || 'Folder';
        };
      
        return (
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
                <Text type="h3" className="mb-2">Upload Your Documents</Text>
                <Text type="paragraph" className="mb-4">
                  Drag and drop files here, or click to browse
                </Text>
                <Text type="sm">
                  Supports PDF, JPG, and PNG files up to 10MB
                </Text>
              </div>
      
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center space-x-2"
                >
                  <ApperIcon name="Plus" size={16} />
                  <span>Choose Files</span>
                </Button>
      
                <Button
                  title="Document templates arriving in v2.0"
                  variant="secondary"
                  className="inline-flex items-center space-x-2"
                >
                  <ApperIcon name="FileTemplate" size={16} />
                  <span>Use Template</span>
                </Button>
              </div>
            </div>
      
            {/* Quick Categories */}
            <div className="mt-8 pt-6 border-t border-surface-200">
              <Text type="sm" className="mb-3">Quick categories:</Text>
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
        );
      };
      
      export default UploadZone;