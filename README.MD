## DT MONEY - Controle financeiro

Nessa aplicação, poderá ter o controle financeiro movimentações de entradas, saídas, balanco, filtros por categorias e nome da transação. Uma aplicação  simples e funcionando, podendo se extender para algo maior adicionando mais algumas funcionalidades e bibliotecas.

## Tecnologias utilizadas:

- React Hook Form (https://react-hook-form.com/): Utilizada para controle do formulário, uma biblioteca performática, flexível auxiliando em todo projeto que haverá um formulário preenchido pelo usuário

- ZOD (https://github.com/colinhacks/zod): Zod é uma biblioteca de validação do formulário com perfeito funcionamento com TypeScript. Usando o termo schema para se referir amplamente a qualquer tipo de dados, de uma string simples a um objeto aninhado complexo.

- Radix (https://www.radix-ui.com/): Incrível biblioteca com componentes acessíveis e sem estilo para criar sistemas de design de alta qualidade e aplicativos da Web no React.

- Styles Components (https://styled-components.com/docs): Biblioteca de estilização utilizando css in js, criando temas, estilizações performáticas e inspirada em sass, podendo ter variações de components e temas padrões de cores e outros.

## Performance

Nesta aplicação também possui alguns exemplos de performance no react, como a utilização de `useCallback`, `useMemo`, `memo` e também a lib `use-context-selector` para seletores no estados no react, otimizando a performance na renderização do componente.

## Reduce

Na aplicacao também foi utilizado o reduce, para utilizar-lo como exemplo caso queira consultar e utilizar em outras aplicações
```tsx
export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    (context) => context.transactions,
  )

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}



```