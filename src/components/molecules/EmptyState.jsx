import ApperIcon from '../ApperIcon';
      import Text from '../atoms/Text';
      
      const EmptyState = ({ iconName, title, description }) => {
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name={iconName} size={32} className="text-gray-400" />
            </div>
            <Text type="h3" className="mb-2">{title}</Text>
            <Text type="paragraph" className="text-gray-500">{description}</Text>
          </div>
        );
      };
      
      export default EmptyState;