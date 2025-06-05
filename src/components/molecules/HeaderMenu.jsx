import ApperIcon from '../ApperIcon';
      import IconButton from '../atoms/IconButton';
      
      const HeaderMenu = ({ onSidebarToggle }) => {
        return (
          <div className="flex items-center space-x-4">
            <IconButton
              iconName="Menu"
              size={20}
              className="md:hidden"
              onClick={onSidebarToggle}
            />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Shield" size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">VaultBox</h1>
            </div>
          </div>
        );
      };
      
      export default HeaderMenu;