import Label from '../atoms/Label';
      import Input from '../atoms/Input';
      
      const FormField = ({ label, id, type = 'text', value, onChange, placeholder, disabled, className = '', ...props }) => {
        return (
          <div className={className}>
            <Label htmlFor={id}>{label}</Label>
            {type === 'textarea' ? (
              <textarea
                id={id}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                rows={3}
                placeholder={placeholder}
                disabled={disabled}
                {...props}
              />
            ) : type === 'select' ? (
              <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                disabled={disabled}
                {...props}
              >
                {props.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                {...props}
              />
            )}
          </div>
        );
      };
      
      export default FormField;