import ApperIcon from '../ApperIcon';
      import Button from '../atoms/Button';
      import IconButton from '../atoms/IconButton';
      import Text from '../atoms/Text';
      
      const DocumentPreviewHeader = ({ document, onClose, onDownload }) => {
        return (
          <div className="flex items-center justify-between p-6 border-b border-surface-200">
            <div>
              <Text type="h3">{document.title}</Text>
              <Text type="sm" className="text-gray-500">{document.category}</Text>
            </div>
            <div className="flex items-center space-x-2">
              <Button title="Document sharing launching next month" variant="secondary" className="text-sm">
                <ApperIcon name="Share2" size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="secondary" onClick={onDownload} className="text-sm">
                <ApperIcon name="Download" size={16} className="mr-2" />
                Download
              </Button>
              <IconButton iconName="X" size={20} onClick={onClose} />
            </div>
          </div>
        );
      };
      
      export default DocumentPreviewHeader;