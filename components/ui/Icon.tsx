import React from 'react';
import { LucideIcon, IconProps } from 'lucide-react';

interface IconComponentProps extends IconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  title?: string;
}

const Icon: React.FC<IconComponentProps> = ({
  name,
  className = '',
  size = 24,
  color = 'currentColor',
  title,
  ...props
}) => {
  const IconComponent = LucideIcon[name];
  
  if (!IconComponent) {
    console.error(`Icon "${name}" does not exist in Lucide icons.`);
    return null;
  }

  return (
    <span role="img" aria-label={title || name} className={`inline-flex ${className}`}>
      <IconComponent
        size={size}
        color={color}
        aria-hidden={!title}
        {...props}
      />
    </span>
  );
};

export default Icon;