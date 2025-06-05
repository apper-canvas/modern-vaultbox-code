const ProgressBar = ({ progress, className = '' }) => {
        return (
          <div className={`w-full bg-surface-200 rounded-full h-2 ${className}`}>
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        );
      };
      
      export default ProgressBar;