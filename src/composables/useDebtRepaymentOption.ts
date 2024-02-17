export const useDebtRepaymentOption = () => {
  type Emit = {
    (event: 'type', payload: 'interestOnly' | 'repayment'): void
    (event: 'rate', payload: number): void
  }

  const handleInterestChange = (event: Event, emit: Emit) => {
    const target = event.target as HTMLInputElement
    emit('rate', Number(target.value))
  }

  const handleTypeChange = (emit: Emit, payload: 'interestOnly' | 'repayment') =>
    emit('type', payload)

  return {
    handleInterestChange,
    handleTypeChange
  }
}
