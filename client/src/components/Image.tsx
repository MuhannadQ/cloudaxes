interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function Image({ src, alt, className, ...rest }: Props) {
  return <img src={src} alt={alt} className={className} {...rest} />
}
