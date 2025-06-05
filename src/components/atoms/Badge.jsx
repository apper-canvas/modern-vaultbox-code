const Badge = ({ children, className = '', ...props }) => {
        return (
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${className}`} {...props}>
            {children}
          </span>
        );
      };
      
      export default Badge;