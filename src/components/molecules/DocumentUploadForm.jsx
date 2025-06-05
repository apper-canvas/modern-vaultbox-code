import FormField from './FormField';
      
      const DocumentUploadForm = ({ formData, setFormData, categories, isUploading }) => {
        return (
          <div className="space-y-4">
            <FormField
              label="Document Title *"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter document title"
              disabled={isUploading}
            />
      
            <FormField
              label="Category *"
              id="category"
              type="select"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              disabled={isUploading}
              options={categories.map((cat) => ({ value: cat.name, label: cat.name }))}
            />
      
            <FormField
              label="Description"
              id="description"
              type="textarea"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Optional description"
              disabled={isUploading}
            />
      
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Issue Date"
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, issueDate: e.target.value }))}
                disabled={isUploading}
              />
      
              <FormField
                label="Expiry Date"
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                disabled={isUploading}
              />
            </div>
          </div>
        );
      };
      
      export default DocumentUploadForm;