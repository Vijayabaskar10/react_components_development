import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  id?: string;
}

const sizeMap = {
  sm: 'text-sm px-3 py-2 rounded-xl',
  md: 'text-base px-4 py-2.5 rounded-2xl',
  lg: 'text-lg px-5 py-3 rounded-3xl'
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    loading,
    variant='outlined',
    size='md',
    type='text',
    name,
    id
  }, ref
){
  const [internal, setInternal] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const isControlled = value !== undefined
  const current = isControlled ? value! : internal
  const inputId = id || React.useId()
  const effectiveType = type === 'password' && showPassword ? 'text' : type

  const base = 'w-full outline-none transition ring-0 focus:ring-0 bg-transparent placeholder-gray-400 dark:placeholder-gray-500'
  const variants: Record<string, string> = {
    filled: 'bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 focus:bg-white/90 dark:focus:bg-white/10',
    outlined: 'border-2 border-plum-200 dark:border-white/10 focus:border-plum-500 dark:focus:border-plum-400 bg-white/40 dark:bg-white/5',
    ghost: 'border border-transparent hover:border-plum-300 focus:border-plum-500 dark:hover:border-white/20 dark:focus:border-plum-300'
  }

  const classes = clsx(
    base,
    sizeMap[size],
    variants[variant],
    disabled && 'opacity-60 cursor-not-allowed',
    invalid && 'border-amberX-500 focus:border-amberX-500'
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    if (!isControlled) setInternal(e.target.value)
  }

  const showClear = !!current && !disabled && !loading
  const isPassword = type === 'password'

  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block font-medium">{label}</span>
      )}
      <div className={clsx('relative flex items-center', disabled && 'pointer-events-none')}>
        <motion.input
          id={inputId}
          ref={ref}
          type={effectiveType}
          name={name}
          aria-invalid={invalid || undefined}
          aria-busy={loading || undefined}
          aria-describedby={helperText ? inputId + '-help' : undefined}
          className={classes}
          placeholder={placeholder}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          whileFocus={{ boxShadow: '0 6px 25px rgba(168,85,247,0.25)', scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
        {loading && (
          <span className="absolute right-3 animate-spin" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3"/>
              <path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="3"/>
            </svg>
          </span>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            className="absolute right-3 text-gray-600 dark:text-gray-300 hover:opacity-80"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
        {showClear && !isPassword && (
          <button
            type="button"
            onClick={() => (isControlled ? onChange?.({ target: { value: '' } } as any) : setInternal(''))}
            className="absolute right-3 text-gray-600 dark:text-gray-300 hover:opacity-80"
            aria-label="Clear input"
            tabIndex={-1}
          >✕</button>
        )}
      </div>
      <div className="mt-1 min-h-[1.25rem]">
        {invalid && errorMessage ? (
          <p role="alert" className="text-amberX-600 text-sm">{errorMessage}</p>
        ) : helperText ? (
          <p id={inputId + '-help'} className="text-gray-600/80 dark:text-gray-300/80 text-sm">{helperText}</p>
        ) : null}
      </div>
    </label>
  )
})
