const Button = ({ children, className = '', variant = 'primary', ...props }) => {
        const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
        const variants = {
          primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/50',
          secondary: 'bg-surface-100 text-gray-700 hover:bg-surface-200 border border-surface-200 focus:ring-primary/20',
          danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50',
          ghost: 'bg-transparent text-gray-700 hover:bg-surface-100 focus:ring-primary/20',
        };
      
        return (
          <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
            {children}
          </button>
        );
      };
      
      export default Button;