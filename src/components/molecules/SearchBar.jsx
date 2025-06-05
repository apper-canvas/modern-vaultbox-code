import ApperIcon from '../ApperIcon';
      import Input from '../atoms/Input';
      
      const SearchBar = ({ searchQuery, setSearchQuery, placeholder = 'Search documents...' }) => {
        return (
          <div className="flex-1 max-w-2xl mx-4 sm:mx-8">
            <div className="relative">
              <ApperIcon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>
          </div>
        );
      };
      
      export default SearchBar;