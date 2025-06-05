import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon';
      import Text from '../atoms/Text';
      import Badge from '../atoms/Badge';
      import IconButton from '../atoms/IconButton';
      
      const DocumentCard = ({ document, setSelectedDocument, handleDocumentDelete, getCategoryColor }) => {
        return (
          <motion.div
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
              <Text type="h3" className="truncate text-base">{document.title}</Text>
              <Badge className={getCategoryColor(document.category)}>
                {document.category}
              </Badge>
              <Text type="xs">
                {new Date(document.uploadDate).toLocaleDateString()}
              </Text>
            </div>
      
            {/* Quick Actions */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex space-x-1">
                <IconButton
                  iconName="Eye"
                  size={14}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDocument(document);
                  }}
                  className="p-1.5 bg-white/90 backdrop-blur-sm shadow-sm"
                  title="Preview"
                />
                <IconButton
                  iconName="Trash2"
                  size={14}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDocumentDelete(document.id);
                  }}
                  className="p-1.5 bg-white/90 backdrop-blur-sm shadow-sm hover:text-red-600"
                  title="Delete"
                />
              </div>
            </div>
          </motion.div>
        );
      };
      
      export default DocumentCard;