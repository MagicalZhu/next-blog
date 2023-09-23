import type { ComponentProps, ReactElement } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Icons } from './icons'
import { Button } from './button'
import { useToast } from "@/components/ui/use-toast"

export const CopyToClipboard = ({
  getValue,
  ...props
}: {
  getValue: () => string
} & ComponentProps<'button'>): ReactElement => {
  const [isCopied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!isCopied) return
    const timerId = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      clearTimeout(timerId)
    }
  }, [isCopied])

  const handleClick = useCallback<
    NonNullable<ComponentProps<'button'>['onClick']>
  >(async () => {
    setCopied(true)
    if (!navigator?.clipboard) {
      console.error('Access to clipboard rejected!')
    }
    try {
      await navigator.clipboard.writeText(getValue())
      toast({
        description: "Copied"
      })
    } catch {
      console.error('Failed to copy!')
    }
  }, [getValue])

  const IconToUse = isCopied ? Icons.check : Icons.copy

  return (
    <Button onClick={handleClick} title="Copy code" tabIndex={0} {...props} className='h-8 w-8'>
      <IconToUse className="text-gray-400" />
    </Button>
  )
}
