import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

type InputProps = React.ComponentProps<"input"> & { 
    validator?: (value: string) => string|undefined
}

function Input({ 
    className, 
    type, id, 
    validator, onBlur, onFocus, 
    ...props 
}: InputProps ) {
    id = id || crypto.randomUUID();
    
    const [ error, setError ] = React.useState<string|undefined>();

    const onBlurTrigger = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (validator)
            setError(validator(e.currentTarget.value))

        if (onBlur)
            onBlur(e);
    }, [])

    const onFocusTrigger = React.useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        setError(undefined);
        
        if (onFocus)
            onFocus(e);
    }, [])

    return (
                <input
                onBlur={onBlurTrigger}
                onFocus={onFocusTrigger}
                type={type}
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-1 shadow-2xs flex h-9 w-full min-w-0 bg-transparent p-3 text-base file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-inter text-black",
                    "focus-visible:border-black outline-black focus-visible:outline-1",
                    "aria-invalid:border-destructive",
                    className
                )}
                aria-invalid={!!error}
                id={id}
                {...props}
            />
    )
}

export { Input }
