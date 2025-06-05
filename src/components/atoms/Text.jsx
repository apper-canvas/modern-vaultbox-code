const Text = ({ children, type = 'paragraph', className = '', ...props }) => {
        const textClasses = {
          h1: 'text-xl font-bold text-gray-900',
          h2: 'text-2xl font-bold text-gray-900',
          h3: 'text-lg font-semibold text-gray-900',
          h4: 'font-medium text-gray-900',
          label: 'text-sm font-semibold text-gray-500 uppercase tracking-wider',
          paragraph: 'text-gray-600',
          sm: 'text-sm text-gray-500',
          xs: 'text-xs text-gray-500',
        };
      
        const Component = type.startsWith('h') ? type : (type === 'label' ? 'h3' : 'p');
      
        return (
          <Component className={`${textClasses[type]} ${className}`} {...props}>
            {children}
          </Component>
        );
      };
      
      export default Text;