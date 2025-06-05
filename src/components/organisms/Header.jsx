import IconButton from '../atoms/IconButton';
      import HeaderMenu from '../molecules/HeaderMenu';
      import SearchBar from '../molecules/SearchBar';
      import ApperIcon from '../ApperIcon';
      
      const Header = ({ searchQuery, setSearchQuery, onSidebarToggle }) => {
        return (
          <header className="bg-white border-b border-surface-200 sticky top-0 z-40 h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="flex items-center justify-between h-full">
                <HeaderMenu onSidebarToggle={onSidebarToggle} />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
                <div className="flex items-center space-x-3">
                  <IconButton
                    iconName="Bell"
                    size={20}
                    className="text-gray-600 relative"
                    title="Notifications (coming soon)"
                  >
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">3</span>
                  </IconButton>
                  <IconButton
                    iconName="Settings"
                    size={20}
                    className="text-gray-600"
                    title="Settings (coming soon)"
                  />
                </div>
              </div>
            </div>
          </header>
        );
      };
      
      export default Header;