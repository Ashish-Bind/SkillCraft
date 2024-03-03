import { AlertTriangle, CheckCircleIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const bannerVariants = cva(
  'border text-center p-4 text-sm flex items-center w-full font-medium',
  {
    variants: {
      variant: {
        warning: 'bg-yellow-300 border-yellow-300 text-primary',
        success: 'bg-orange-500 border-orange-500 text-secondary',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
}

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || 'warning']

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  )
}
