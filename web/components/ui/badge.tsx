import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-stone-100 text-stone-900",
        destructive: "border-transparent bg-red-600 text-white",
        outline: "border-stone-300 text-stone-700",
        success: "border-transparent bg-green-600 text-white",
        sale: "border-transparent bg-primary text-white",
        bestseller: "border-transparent bg-white/90 text-stone-900 backdrop-blur-sm",
        new: "border-transparent bg-primary text-white",
        eco: "border-transparent bg-white/90 text-stone-900 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
