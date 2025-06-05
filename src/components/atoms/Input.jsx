const Input = ({ type = 'text', className = '', ...props }) => {
        return (
          <input
            type={type}
            className={`w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${className}`}
            {...props}
          />
        );
      };
      
      export default Input;