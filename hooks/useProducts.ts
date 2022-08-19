import useSWR, { SWRConfiguration } from 'swr'
import { IProducts } from '../interfaces'

// const fetcher = (...args: [key: string]) =>
//   fetch(...args).then(res => res.json())

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  //   const { data, error } = useSWR<{ products: IProducts[] }>(
  //     `/api${url}`,
  //     fetcher,
  //     config
  //   )

  const { data, error } = useSWR<{ products: IProducts[] }>(
    `/api${url}`,
    config
  )

  return {
    products: data?.products || [],
    isLoading: !error && !data,
    isError: error
  }
}
