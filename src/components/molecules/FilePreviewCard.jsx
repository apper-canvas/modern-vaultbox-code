import ApperIcon from '../ApperIcon';
      import Text from '../atoms/Text';
      
      const FilePreviewCard = ({ file }) => {
        return (
          <div className="flex items-center space-x-4 p-4 bg-surface-50 rounded-xl">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ApperIcon
                name={file?.type.includes('pdf') ? 'FileText' : 'Image'}
                size={20}
                className="text-primary"
              />
            </div>
            <div className="flex-1">
              <Text type="paragraph" className="font-medium text-gray-900">{file?.name}</Text>
              <Text type="sm">
                {file?.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}
              </Text>
            </div>
          </div>
        );
      };
      
      export default FilePreviewCard;