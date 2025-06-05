import ApperIcon from '../ApperIcon';
      
      const IconButton = ({ iconName, size = 20, className = '', title = '', onClick, ...props }) => {
        return (
          <button
            onClick={onClick}
            title={title}
            className={`p-2 rounded-lg hover:bg-surface-100 transition-colors ${className}`}
            {...props}
          >
            <ApperIcon name={iconName} size={size} />
          </button>
        );
      };
      
      export default IconButton;