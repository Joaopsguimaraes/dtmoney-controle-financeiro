import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  created_at: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  /**
   * @useCallback - useCallback é um hook que nos permite memorizar a função, sendo assim sendo executada somente uma vez
   * quando o component for montado.
   * @var fetchTransactions responsável por fazer a busca dos dados das transações na api
   * @param query valor digitado na pesquisa para busca de transações, por query params
   */
  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'created_at',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  /**
   * @useCallback useCallback é um hook que nos permite memorizar a função, sendo assim sendo executada somente uma vez
   * quando o component for montado.
   * @var createTransaction responsável por criar uma nova transação na api
   * @param data dados da transação a ser criada e enviada para a api
   */
  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data
      const response = await api.post('/transactions', {
        description,
        category,
        price,
        type,
        created_at: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  /**
   * @fetch fetchTransactions é executado assim que o componente é montado,
   * carregando os dados da api
   */
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
