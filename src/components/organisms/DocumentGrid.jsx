import Text from '../atoms/Text';
      import Button from '../atoms/Button';
      import ApperIcon from '../ApperIcon';
      import DocumentCard from '../molecules/DocumentCard';
      import EmptyState from '../molecules/EmptyState';
      
      const DocumentGrid = ({
        filteredDocuments,
        loading,
        selectedCategory,
        setSelectedDocument,
        handleDocumentDelete,
        searchQuery,
        getCategoryColor,
      }) => {
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Text type="h2">
                {selectedCategory === 'all' ? 'All Documents' : selectedCategory}
              </Text>
              <div className="flex items-center space-x-3">
                <Text type="sm">
                  {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
                </Text>
                <Button title="Bulk actions coming soon!" variant="secondary" className="text-sm">
                  <ApperIcon name="CheckSquare" size={16} className="mr-2" />
                  Select All
                </Button>
              </div>
            </div>
      
            {loading ? (
              <div className="document-grid gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="card p-4 space-y-3">
                    <div className="aspect-video bg-surface-200 rounded-lg skeleton"></div>
                    <div className="h-4 bg-surface-200 rounded skeleton"></div>
                    <div className="h-3 bg-surface-200 rounded w-2/3 skeleton"></div>
                  </div>
                ))}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <EmptyState
                iconName="FileX"
                title="No documents found"
                description={searchQuery ? 'Try adjusting your search terms' : 'Upload your first document to get started'}
              />
            ) : (
              <div className="document-grid gap-6">
                {filteredDocuments.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    setSelectedDocument={setSelectedDocument}
                    handleDocumentDelete={handleDocumentDelete}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </div>
            )}
          </div>
        );
      };
      
      export default DocumentGrid;