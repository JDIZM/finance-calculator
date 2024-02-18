export const useDebtRepaymentOption = () => {
  type Emit = {
    (event: 'update:type', payload: 'interestOnly' | 'repayment'): void
    (event: 'update:rate', payload: number): void
  }

  const handleInterestChange = (event: Event, emit: Emit) => {
    const target = event.target as HTMLInputElement
    emit('update:rate', Number(target.value))
  }

  const handleTypeChange = (emit: Emit, payload: 'interestOnly' | 'repayment') =>
    emit('update:type', payload)

  return {
    handleInterestChange,
    handleTypeChange
  }
}
