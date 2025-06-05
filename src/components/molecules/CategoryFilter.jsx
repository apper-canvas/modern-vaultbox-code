import Text from '../atoms/Text';
      import SidebarCategoryItem from './SidebarCategoryItem';
      import ApperIcon from '../ApperIcon';
      
      const CategoryFilter = ({
        categories,
        documents,
        selectedCategory,
        setSelectedCategory,
        setSidebarOpen,
        getCategoryIcon,
      }) => {
        return (
          <div>
            <Text type="label" className="mb-3">Categories</Text>
            <nav className="space-y-2">
              <SidebarCategoryItem
                category={{ name: 'All Documents', id: 'all' }}
                isActive={selectedCategory === 'all'}
                documentCount={documents.length}
                onClick={() => {
                  setSelectedCategory('all');
                  setSidebarOpen(false);
                }}
                getCategoryIcon={() => 'FolderOpen'}
              />
      
              {categories.map((category) => (
                <SidebarCategoryItem
                  key={category.id}
                  category={category}
                  isActive={selectedCategory === category.name}
                  documentCount={documents.filter((doc) => doc.category === category.name).length}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSidebarOpen(false);
                  }}
                  getCategoryIcon={getCategoryIcon}
                />
              ))}
            </nav>
          </div>
        );
      };
      
      export default CategoryFilter;