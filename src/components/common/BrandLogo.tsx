type BrandLogoProps = {
  variant?: 'full' | 'icon';
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  alt?: string;
};

const BrandLogo = ({
  variant = 'full',
  className,
  imgClassName,
  width,
  height,
  alt = 'TutoriumBD logo',
}: BrandLogoProps) => {
  if (variant === 'icon') {
    return (
      <img
        src="/images/logo/tutoriumBdLogo.png"
        alt={alt}
        width={width}
        height={height}
        className={[className, imgClassName].filter(Boolean).join(' ')}
      />
    );
  }

  return (
    <span className={['inline-flex', className].filter(Boolean).join(' ')}>
      <img
        className={['dark:hidden', imgClassName].filter(Boolean).join(' ')}
        src="/images/logo/finalLogoLight.png"
        alt={alt}
        width={width}
        height={height}
      />
      <img
        className={['hidden dark:block', imgClassName].filter(Boolean).join(' ')}
        src="/images/logo/finalLogoDark.png"
        alt={alt}
        width={width}
        height={height}
      />
    </span>
  );
};

export default BrandLogo;
