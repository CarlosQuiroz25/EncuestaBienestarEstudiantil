import { cva } from "class-variance-authority"
import { cn } from "../../utils/cn"

const inputVariants = cva("border border-gray-400 p-2 rounded-lg bg-gray-100", {
  variants: {
    size: {
      sm: "py-1 px-2 text-xs",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg",
      full: "py-3 px-6 text-lg w-full"
    }
  },
  defaultVariants: {
    size: "full"
  }
})

export const Input = ({label, type = "text", size, className, ...props}) => {
  if (type !== "range" || type !== "datetime-local" || type !== "file" || type !== "color" || type !== "checkbox" || type !== "radio") {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-lg font-semibold text-jet" >{label}</label>
        <input 
          {...props}
          type={type}
          className={cn(inputVariants({ size, className }))}
        />
      </div>
    )
  }
}