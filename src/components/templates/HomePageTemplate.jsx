import { useState, useEffect } from 'react';
      import { toast } from 'react-toastify';
      import Header from '../organisms/Header';
      import Sidebar from '../organisms/Sidebar';
      import UploadZone from '../organisms/UploadZone';
      import UploadDocumentModal from '../organisms/UploadDocumentModal';
      import DocumentGrid from '../organisms/DocumentGrid';
      import DocumentPreviewModal from '../organisms/DocumentPreviewModal';
      import * as documentService from '../../services/api/documentService';
      import * as categoryService from '../../services/api/categoryService';
      
      const HomePageTemplate = () => {
        const [documents, setDocuments] = useState([]);
        const [categories, setCategories] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [selectedCategory, setSelectedCategory] = useState('all');
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedDocument, setSelectedDocument] = useState(null);
        const [sidebarOpen, setSidebarOpen] = useState(false);
        const [showUploadModal, setShowUploadModal] = useState(false);
        const [fileToUpload, setFileToUpload] = useState(null);
      
        useEffect(() => {
          const loadData = async () => {
            setLoading(true);
            try {
              const [docsResult, catsResult] = await Promise.all([
                documentService.getAll(),
                categoryService.getAll()
              ]);
              setDocuments(docsResult || []);
              setCategories(catsResult || []);
            } catch (err) {
              setError(err?.message || 'Failed to load data');
              toast.error('Failed to load documents');
            } finally {
              setLoading(false);
            }
          };
          loadData();
        }, []);
      
        const handleFileSelected = (file) => {
          setFileToUpload(file);
          setShowUploadModal(true);
        };
      
        const handleDocumentUpload = async (file, metadata) => {
          try {
            const newDocument = await documentService.create({
              title: metadata.title,
              description: metadata.description,
              category: metadata.category,
              fileUrl: URL.createObjectURL(file),
              fileType: file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'jpg' : 'png',
              uploadDate: new Date().toISOString(),
              issueDate: metadata.issueDate,
              expiryDate: metadata.expiryDate,
              thumbnailUrl: URL.createObjectURL(file),
              fileSize: file.size
            });
            setDocuments(prev => [newDocument, ...prev]);
            toast.success('Document uploaded successfully!');
          } catch (err) {
            toast.error('Failed to upload document');
            throw err; // Re-throw to be caught by modal's upload logic
          }
        };
      
        const handleDocumentDelete = async (id) => {
          try {
            await documentService.delete(id);
            setDocuments(prev => prev.filter(doc => doc.id !== id));
            setSelectedDocument(null);
            toast.success('Document deleted successfully!');
          } catch (err) {
            toast.error('Failed to delete document');
          }
        };
      
        const filteredDocuments = documents.filter(doc => {
          const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
          const matchesSearch = doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });
      
        const getCategoryIcon = (categoryName) => {
          const iconMap = {
            'IDs': 'CreditCard',
            'Education': 'GraduationCap',
            'Finance': 'DollarSign',
            'Medical': 'Heart',
            'Others': 'Folder'
          };
          return iconMap[categoryName] || 'Folder';
        };
      
        const getCategoryColor = (categoryName) => {
          const colorMap = {
            'IDs': 'bg-purple-100 text-purple-700 border-purple-200',
            'Education': 'bg-blue-100 text-blue-700 border-blue-200',
            'Finance': 'bg-emerald-100 text-emerald-700 border-emerald-200',
            'Medical': 'bg-red-100 text-red-700 border-red-200',
            'Others': 'bg-gray-100 text-gray-700 border-gray-200'
          };
          return colorMap[categoryName] || 'bg-gray-100 text-gray-700 border-gray-200';
        };
      
        return (
          <div className="min-h-screen bg-surface-50">
            <Header
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
            />
      
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                documents={documents}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                getCategoryIcon={getCategoryIcon}
              />
      
              <main className="flex-1 md:ml-0 p-6">
                <div className="mb-8">
                  <UploadZone onFileSelected={handleFileSelected} categories={categories} />
                </div>
      
                <DocumentGrid
                  filteredDocuments={filteredDocuments}
                  loading={loading}
                  selectedCategory={selectedCategory}
                  setSelectedDocument={setSelectedDocument}
                  handleDocumentDelete={handleDocumentDelete}
                  searchQuery={searchQuery}
                  getCategoryColor={getCategoryColor}
                />
              </main>
            </div>
      
            <DocumentPreviewModal
              selectedDocument={selectedDocument}
              onClose={() => setSelectedDocument(null)}
            />
      
            <UploadDocumentModal
              showModal={showUploadModal}
              onClose={() => {
                setShowUploadModal(false);
                setFileToUpload(null);
              }}
              onUpload={handleDocumentUpload}
              selectedFile={fileToUpload}
              categories={categories}
            />
          </div>
        );
      };
      
      export default HomePageTemplate;