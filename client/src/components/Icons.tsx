import {
  SunIcon,
  MoonIcon,
  LaptopIcon,
  ReloadIcon,
  HeartFilledIcon,
  CopyIcon,
} from '@radix-ui/react-icons'

type IconProps = React.HTMLAttributes<SVGElement>

const Icons = {
  sun: SunIcon,
  moon: MoonIcon,
  laptop: LaptopIcon,
  reload: ReloadIcon,
  heart: HeartFilledIcon,
  copy: CopyIcon,
  logo: () => (
    <div className="flex items-center space-x-1.5">
      <Icons.cloud className="h-9 w-9" />
      <span className="inline-block font-bold tracking-wider">Cloudaxes</span>
    </div>
  ),
  spinner: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  cloud: (props: IconProps) => (
    <svg
      fill="#000000"
      height="200px"
      width="200px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-81.92 -81.92 675.84 675.84"
      xmlSpace="preserve"
      stroke="#000000"
      strokeWidth="12.800025"
      transform="matrix(1, 0, 0, 1, 0, 0)"
      {...props}
    >
      <g id="cloud_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
        <rect
          x="-81.92"
          y="-81.92"
          width="675.84"
          height="675.84"
          rx="223.02720000000002"
          fill="#000000"
          strokeWidth="0"
        ></rect>
      </g>
      <g
        id="cloud_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#ffffff"
        strokeWidth="70.65613799999998"
      >
        <g>
          <g>
            <path d="M344.381,143.771C254.765,56.017,102.37,103.776,79.825,227.7c-31.849,4.598-59.138,25.445-72.018,55.076 c-0.016,0.035-0.032,0.07-0.047,0.107c-26.687,61.602,18.784,130.232,85.51,130.232h282.267 c75.246,0,136.463-61.216,136.463-136.462C512,189.241,430.314,123.682,344.381,143.771z M375.537,381.12H93.271 c-69.246,0-84.534-98.263-18.714-119.456c14.753-4.65,43.01-7.348,74.38,21.892c6.464,6.024,16.586,5.667,22.61-0.794 c6.024-6.464,5.668-16.586-0.794-22.61c-17.93-16.712-38.071-27.33-58.484-31.453c22.034-99.077,147.374-131.851,215.247-56.305 c4.189,4.661,10.714,6.451,16.693,4.57c67.272-21.117,135.795,29.374,135.795,99.69 C480.005,334.256,433.141,381.12,375.537,381.12z"></path>
          </g>
        </g>
      </g>
      <g id="cloud_iconCarrier">
        <g>
          <g>
            <path d="M344.381,143.771C254.765,56.017,102.37,103.776,79.825,227.7c-31.849,4.598-59.138,25.445-72.018,55.076 c-0.016,0.035-0.032,0.07-0.047,0.107c-26.687,61.602,18.784,130.232,85.51,130.232h282.267 c75.246,0,136.463-61.216,136.463-136.462C512,189.241,430.314,123.682,344.381,143.771z M375.537,381.12H93.271 c-69.246,0-84.534-98.263-18.714-119.456c14.753-4.65,43.01-7.348,74.38,21.892c6.464,6.024,16.586,5.667,22.61-0.794 c6.024-6.464,5.668-16.586-0.794-22.61c-17.93-16.712-38.071-27.33-58.484-31.453c22.034-99.077,147.374-131.851,215.247-56.305 c4.189,4.661,10.714,6.451,16.693,4.57c67.272-21.117,135.795,29.374,135.795,99.69 C480.005,334.256,433.141,381.12,375.537,381.12z"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  axes: (props: IconProps) => (
    <svg
      fill="currentColor"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      strokeWidth="0"
      transform="matrix(1, 0, 0, 1, 0, 0)"
      {...props}
    >
      <g id="axes_bgCarrier" strokeWidth="0"></g>
      <g id="axes_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="axes_iconCarrier">
        <title>crossed-axes</title>
        <path d="M27.705 27.619l-1.791-2.37-0.529 0.398c-4.096-4.34-5.55-8.426-7.566-13.033 0.633-1.406 1.296-2.797 2.027-4.152l0.96 0.556c3.228-3.958 4.218 5.028 2.233 8.759 6.527-1.672 12.19-12.267 4.958-16.443-1.786 3.093-4.426 2.219-8.724-0.271l-3.050 5.3 0.804 0.465c-0.373 0.646-0.717 1.279-1.038 1.9-0.321-0.621-0.665-1.254-1.038-1.901l0.803-0.465-3.050-5.3c-4.298 2.489-6.938 3.364-8.724 0.271-7.232 4.176-1.57 14.771 4.958 16.443-1.985-3.73-0.995-12.717 2.233-8.759l0.96-0.556c0.732 1.355 1.394 2.746 2.027 4.152-2.016 4.607-3.47 8.693-7.566 13.033l-0.529-0.398-1.791 2.37 0.156 0.117c-0.14 0.124-0.282 0.247-0.426 0.372 0.618 1.172 1.834 1.818 3.19 2.342 0.13-0.114 0.258-0.23 0.384-0.346l0.783 0.589 1.791-2.37-0.506-0.381c2.804-3.317 4.621-7.198 6.346-11.145 1.724 3.947 3.542 7.828 6.346 11.145l-0.507 0.381 1.791 2.37 0.783-0.589c0.126 0.116 0.254 0.232 0.384 0.346 1.356-0.524 2.572-1.17 3.19-2.342-0.145-0.124-0.287-0.248-0.426-0.372l0.156-0.117z"></path>
      </g>
    </svg>
  ),
}

export default Icons
