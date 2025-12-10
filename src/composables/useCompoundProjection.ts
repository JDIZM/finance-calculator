import { computed, ref, type Ref } from 'vue'
import { compoundInterestPerPeriod } from '@jdizm/finance-calculator'
import type { IOptions, CompoundInterestResult } from '@jdizm/finance-calculator/types/calculator'

export interface ProjectionData {
  labels: string[]
  deposits: number[]
  interest: number[]
  projection: number[]
}

export interface ProjectionOptions {
  initialDeposit: number
  monthlyContribution: number
  years: number
  interestRate: number
}

export function useCompoundProjection(options: Ref<ProjectionOptions> | ProjectionOptions) {
  const optionsRef = ref(options)

  const calculationOptions = computed<IOptions>(() => ({
    type: 'contribution',
    principal: optionsRef.value.initialDeposit,
    rate: optionsRef.value.interestRate,
    years: optionsRef.value.years,
    paymentsPerAnnum: 12,
    amountPerAnnum: optionsRef.value.monthlyContribution * 12,
    accrualOfPaymentsPerAnnum: true
  }))

  const result = computed<CompoundInterestResult>(() => {
    return compoundInterestPerPeriod(calculationOptions.value)
  })

  const projectionData = computed<ProjectionData>(() => {
    const years = optionsRef.value.years
    const labels: string[] = []
    const deposits: number[] = []
    const interest: number[] = []
    const projection: number[] = []

    // Generate data points for each year
    for (let year = 1; year <= years; year++) {
      const yearLabel = year === 1 ? '1Y' : year % 5 === 0 ? `${year}Y` : ''

      if (year === 1 || year === years || year % 5 === 0) {
        labels.push(yearLabel || `${year}Y`)

        // Get balance at this year from interestMatrix
        const balanceAtYear = result.value.interestMatrix.get(String(year))
        const endBalanceAtYear = balanceAtYear ? balanceAtYear[11] : 0 // December (index 11)

        // Calculate total deposits up to this year
        const totalDeposits =
          optionsRef.value.initialDeposit + optionsRef.value.monthlyContribution * 12 * year

        // Calculate interest earned
        const interestEarned = endBalanceAtYear - totalDeposits

        deposits.push(Math.round(totalDeposits))
        interest.push(Math.round(interestEarned))
        projection.push(Math.round(endBalanceAtYear))
      }
    }

    return {
      labels,
      deposits,
      interest,
      projection
    }
  })

  const summary = computed(() => ({
    totalDeposits: Math.round(result.value.totalInvestment),
    totalInterest: Math.round(result.value.totalInterest),
    endBalance: Math.round(result.value.endBalance),
    interestRate: result.value.rate * 100
  }))

  return {
    result,
    projectionData,
    summary
  }
}
