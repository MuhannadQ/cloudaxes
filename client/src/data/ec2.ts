import Icons from '@/components/Icons'

export const instanceTypes = [
  { value: 't2.micro', label: 't2.micro' },
  { value: 't3.small', label: 't3.small' },
  { value: 'm5.large', label: 'm5.large' },
  { value: 't2.xlarge', label: 't2.xlarge' },
  { value: 'm3.medium', label: 'm3.medium' },
]
export const regions = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'us-east-2', label: 'US East (Ohio)' },
  { value: 'us-west-1', label: 'US West (N. California)' },
  { value: 'us-west-2', label: 'US West (Oregon)' },
  { value: 'ca-central-1', label: 'Canada (Central)' },
  { value: 'eu-central-1', label: 'EU (Frankfurt)' },
  { value: 'eu-west-1', label: 'EU (Ireland)' },
  { value: 'eu-west-2', label: 'EU (London)' },
  { value: 'eu-west-3', label: 'EU (Paris)' },
  { value: 'eu-north-1', label: 'EU (Stockholm)' },
  { value: 'ap-south-1', label: 'Asia Pacific (Mumbai)' },
  { value: 'ap-northeast-1', label: 'Asia Pacific (Tokyo)' },
  { value: 'ap-northeast-2', label: 'Asia Pacific (Seoul)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
  { value: 'ap-southeast-2', label: 'Asia Pacific (Sydney)' },
  { value: 'me-south-1', label: 'Middle East (Bahrain)' },
  { value: 'sa-east-1', label: 'South America (Sao Paulo)' },
]

export const stateNames = [
  {
    value: 'pending',
    label: 'Pending',
    icon: Icons.questionMark,
  },
  {
    value: 'running',
    label: 'Running',
    icon: Icons.check,
  },
  {
    value: 'shutting-down',
    label: 'Shutting down',
    icon: Icons.stopwatch,
  },
  {
    value: 'stopping',
    label: 'Stopping',
    icon: Icons.stopwatch,
  },
  {
    value: 'stopped',
    label: 'Stopped',
    icon: Icons.circle,
  },
  {
    value: 'terminated',
    label: 'Terminated',
    icon: Icons.cross,
  },
]
