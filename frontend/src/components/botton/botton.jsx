import { cn } from "../../utils/cn"
import { cva } from "class-variance-authority"

const buttonVariants = cva("hover:cursor-pointer hover:scale-105 transition-scale duration-300 font-bold inline-block px-5 py-3", {
  variants: {
    colVariant: {
      default: "bg-marian-blue hover:bg-marian-blue/80  text-white-smoke",
      secondary: "bg-none text-marian-blue hover:text-marian-blue/40"
    },
    variant: {
      outline: "bg-none border border-marian-blue",
      basic: "rounded-none",
      rounded: "rounded-lg",
      pill: "rounded-full"
    },
    size: {
      sm: "py-1 px-2 text-xs",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg",
      full: "py-3 px-6 text-lg w-full"
    }
  },
  defaultVariants: {
    colVariant: "default",
    variant: "rounded",
    size: "full"
  }
})

export const Button = ({children, className, variant, colVariant, size, ...props}) => {
  const newClassName = cn(buttonVariants({variant, colVariant, size, className}))

  return (
    <button 
      className={newClassName}
      {...props}
    >
      {children}
    </button>
  )
}
