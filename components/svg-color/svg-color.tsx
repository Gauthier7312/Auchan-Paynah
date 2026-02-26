import { forwardRef } from 'react';

export interface SvgColorProps extends React.ComponentPropsWithoutRef<'span'> {
  src: string;
}

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, className = '', style, ...other }, ref) => (
    <span
      ref={ref}
      className={`inline-block bg-[currentColor] ${className}`.trim()}
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...style,
      }}
      {...other}
    />
  )
);

SvgColor.displayName = 'SvgColor';

export default SvgColor;
