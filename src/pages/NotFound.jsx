import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="FileQuestion" size={48} className="text-primary" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Document Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for seems to have been moved or doesn't exist in your vault.
        </p>
        
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center space-x-2"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          <span>Return to Vault</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound