import { motion, AnimatePresence } from 'framer-motion';
      import ApperIcon from '../ApperIcon';
      import DocumentPreviewHeader from '../molecules/DocumentPreviewHeader';
      import Text from '../atoms/Text';
      
      const DocumentPreviewModal = ({ selectedDocument, onClose }) => {
        const handleDownload = () => {
          if (selectedDocument) {
            const link = document.createElement('a');
            link.href = selectedDocument.fileUrl;
            link.download = selectedDocument.title;
            link.click();
          }
        };
      
        return (
          <AnimatePresence>
            {selectedDocument && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden backdrop-blur-glass"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DocumentPreviewHeader
                    document={selectedDocument}
                    onClose={onClose}
                    onDownload={handleDownload}
                  />
      
                  {/* Modal Content */}
                  <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="bg-surface-50 rounded-xl p-8 flex items-center justify-center min-h-96">
                      {selectedDocument.fileType === 'pdf' ? (
                        <div className="text-center">
                          <ApperIcon name="FileText" size={64} className="text-gray-400 mx-auto mb-4" />
                          <Text type="paragraph" className="text-gray-600">PDF Preview</Text>
                          <Text type="sm" className="mt-2">Full PDF viewer coming soon</Text>
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
                        <Text type="h4" className="mb-2">Description</Text>
                        <Text type="paragraph" className="text-gray-600">{selectedDocument.description}</Text>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      };
      
      export default DocumentPreviewModal;