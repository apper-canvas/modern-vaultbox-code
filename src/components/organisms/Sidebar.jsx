import { motion, AnimatePresence } from 'framer-motion';
      import CategoryFilter from '../molecules/CategoryFilter';
      import Button from '../atoms/Button';
      import ApperIcon from '../ApperIcon';
      import Text from '../atoms/Text';
      
      const Sidebar = ({
        sidebarOpen,
        setSidebarOpen,
        documents,
        categories,
        selectedCategory,
        setSelectedCategory,
        getCategoryIcon,
      }) => {
        return (
          <>
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-30 md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
            </AnimatePresence>
      
            {/* Sidebar */}
            <motion.aside
              initial={false}
              animate={{ x: sidebarOpen ? 0 : '-100%' }}
              className="fixed md:static top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-white border-r border-surface-200 z-30 md:z-0 md:translate-x-0 transition-transform duration-300 overflow-y-auto"
            >
              <div className="p-6">
                <div className="space-y-6">
                  {/* Categories */}
                  <CategoryFilter
                    categories={categories}
                    documents={documents}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setSidebarOpen={setSidebarOpen}
                    getCategoryIcon={getCategoryIcon}
                  />
      
                  {/* Tags Placeholder */}
                  <div>
                    <Text type="label" className="mb-3">Tags</Text>
                    <Button variant="secondary" className="w-full flex items-center justify-center border-dashed border-2 border-surface-300 hover:border-primary hover:text-primary">
                      <ApperIcon name="Plus" size={16} className="mr-2" />
                      <Text type="sm" className="!text-sm">Custom tags in development</Text>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        );
      };
      
      export default Sidebar;