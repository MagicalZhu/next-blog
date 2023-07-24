"use client"

import cn from 'clsx'
import type { ComponentProps, ReactElement } from 'react'
import { useRef } from 'react'
import { CopyToClipboard } from '../copy-to-clipboard'

export const Pre = ({
  children,
  className,
  title,
  ...props
}: ComponentProps<'pre'> & {
  title?: string
}): ReactElement => {
  const preRef = useRef<HTMLPreElement | null>(null)
  return (
    <div className="relative first:mt-0">
        <pre
          className={cn(
            'bg-primary-700/5 mb-4 overflow-x-auto  font-medium subpixel-antialiased dark:bg-primary-300/10 text-[.9em] border-black',
            'contrast-more:border contrast-more:border-primary-900/20 contrast-more:contrast-150 contrast-more:dark:border-primary-100/40',
            title ? 'pt-2 pb-2' : 'py-2',
            className
            )}
            ref={preRef}
            {...props}
            >
            {title && (
              <div className="flex items-center">
                <div className={cn(
                  'flex rounded-t-xl gap-[8px]  items-center bg-primary-700/5  min-w-0 px-4 m-0 mr-auto',
                  'text-gray-200 dark:bg-primary-300/10 dark:text-gray-200',
                  )}>
                  {title}
                </div>
                <div>
                  <CopyToClipboard className='flex gap-[4px]'
                  getValue={() =>
                    preRef.current?.querySelector('code')?.textContent || ''
                  }
                  />
                </div>
              </div>
            )}
          {children}
        </pre>
      <div
        className={cn(
          'opacity-50 transition [div:hover>&]:opacity-100 focus-within:opacity-100',
          'flex gap-1 absolute m-[11px] right-0',
          title ? 'top-8' : 'top-0'
        )}
      >

      </div>
    </div>
  )
}
