import ApperIcon from '../ApperIcon';
      import Text from '../atoms/Text';
      
      const SidebarCategoryItem = ({
        category,
        isActive,
        documentCount,
        onClick,
        getCategoryIcon,
      }) => {
        return (
          <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white transform translate-x-1'
                : 'hover:bg-surface-100 text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ApperIcon name={getCategoryIcon(category.name)} size={18} className={isActive ? 'text-white' : 'text-gray-700'} />
              <Text type="paragraph" className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                {category.name}
              </Text>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              isActive ? 'bg-white/20' : 'bg-surface-200 text-gray-700'
            }`}>
              {documentCount}
            </span>
          </button>
        );
      };
      
      export default SidebarCategoryItem;