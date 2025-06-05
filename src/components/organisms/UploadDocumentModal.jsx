import { useState, useEffect } from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import { toast } from 'react-toastify';
      import ApperIcon from '../ApperIcon';
      import Button from '../atoms/Button';
      import IconButton from '../atoms/IconButton';
      import Text from '../atoms/Text';
      import ProgressBar from '../atoms/ProgressBar';
      import FilePreviewCard from '../molecules/FilePreviewCard';
      import DocumentUploadForm from '../molecules/DocumentUploadForm';
      
      const UploadDocumentModal = ({ showModal, onClose, onUpload, selectedFile, categories }) => {
        const [isUploading, setIsUploading] = useState(false);
        const [uploadProgress, setUploadProgress] = useState(0);
        const [formData, setFormData] = useState({
          title: '',
          description: '',
          category: '',
          issueDate: '',
          expiryDate: ''
        });
      
        useEffect(() => {
          if (selectedFile) {
            setFormData(prev => ({
              ...prev,
              title: selectedFile.name.replace(/\.[^/.]+$/, ""), // Remove file extension
              category: categories[0]?.name || 'Others'
            }));
          } else {
            setFormData({
              title: '',
              description: '',
              category: '',
              issueDate: '',
              expiryDate: ''
            });
          }
        }, [selectedFile, categories]);
      
        const handleUpload = async () => {
          if (!selectedFile || !formData.title || !formData.category) {
            toast.error('Please fill in all required fields');
            return;
          }
      
          setIsUploading(true);
          setUploadProgress(0);
      
          const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return prev;
              }
              return prev + Math.random() * 30;
            });
          }, 200);
      
          try {
            await onUpload(selectedFile, formData);
            setUploadProgress(100);
      
            setTimeout(() => {
              onClose();
              setIsUploading(false);
              setUploadProgress(0);
            }, 1000);
          } catch (error) {
            toast.error('Upload failed. Please try again.');
          } finally {
            clearInterval(progressInterval);
          }
        };
      
        return (
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => !isUploading && onClose()}
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
                    <Text type="h3">Upload Document</Text>
                    {!isUploading && (
                      <IconButton iconName="X" size={20} onClick={onClose} />
                    )}
                  </div>
      
                  {/* Modal Content */}
                  <div className="p-6 space-y-6">
                    {selectedFile && <FilePreviewCard file={selectedFile} />}
      
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <Text type="paragraph" className="text-gray-600">Uploading...</Text>
                          <Text type="paragraph" className="text-primary font-medium">{Math.round(uploadProgress)}%</Text>
                        </div>
                        <ProgressBar progress={uploadProgress} />
                      </div>
                    )}
      
                    <DocumentUploadForm
                      formData={formData}
                      setFormData={setFormData}
                      categories={categories}
                      isUploading={isUploading}
                    />
      
                    {/* Modal Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-surface-200">
                      {!isUploading && (
                        <Button variant="secondary" onClick={onClose} className="flex-1">
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={handleUpload}
                        disabled={isUploading || !formData.title || !formData.category}
                        className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2"
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
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };
      
      export default UploadDocumentModal;