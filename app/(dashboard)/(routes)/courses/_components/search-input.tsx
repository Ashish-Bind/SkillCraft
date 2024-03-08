'use client'

import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'

const SearchInput = () => {
  const [value, setValue] = useState('')
  const debounceValue = useDebounce(value)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentCategoryId = searchParams.get('category-id')

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          'category-id': currentCategoryId,
          search: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debounceValue, currentCategoryId, router, pathname])

  return (
    <div className="relative">
      <Search className="absolute size-4 top-3 left-3" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-full w-[350px] pl-9 bg-gray-200 focus-visible:ring-gray-300"
        placeholder="Search for a course..."
      />
    </div>
  )
}

export default SearchInput
