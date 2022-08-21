import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { SearchFormContainer } from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => context.fetchTransactions,
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        disabled={isSubmitting}
        {...register('query')}
      />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

/**
 * @memo - useMemo é um hook que nos permite memorizar o resultado de uma função, sendo assim sendo executada somente uma vez
 * 0. Observa se os hooks deste component foram alterados ou se as props alteradas
 * 0.1. Compara a versão anterior dos hooks e props
 * 0.2. Se a versão anterior dos hooks e props forem iguais, nao renderiza o componente, pois nao haverá alteração
 * 0.3. Se a versão anterior dos hooks e props forem diferentes, renderiza o componente
 */
export const SearchForm = memo(SearchFormComponent)
