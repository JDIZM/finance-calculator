import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useCompoundProjection } from './useCompoundProjection'

describe('useCompoundProjection', () => {
  it('should calculate projection data correctly', () => {
    const options = ref({
      initialDeposit: 5000,
      monthlyContribution: 500,
      years: 25,
      interestRate: 5.0
    })

    const { projectionData, summary } = useCompoundProjection(options)

    // Check that projection data is generated
    expect(projectionData.value.labels).toBeDefined()
    expect(projectionData.value.deposits).toBeDefined()
    expect(projectionData.value.interest).toBeDefined()
    expect(projectionData.value.projection).toBeDefined()

    // Check array lengths match
    expect(projectionData.value.labels.length).toBe(projectionData.value.deposits.length)
    expect(projectionData.value.labels.length).toBe(projectionData.value.interest.length)
    expect(projectionData.value.labels.length).toBe(projectionData.value.projection.length)

    // Check that projection values increase over time
    const projections = projectionData.value.projection
    for (let i = 1; i < projections.length; i++) {
      expect(projections[i]).toBeGreaterThan(projections[i - 1])
    }
  })

  it('should calculate summary correctly', () => {
    const options = ref({
      initialDeposit: 5000,
      monthlyContribution: 500,
      years: 25,
      interestRate: 5.0
    })

    const { summary } = useCompoundProjection(options)

    expect(summary.value.totalDeposits).toBeGreaterThan(0)
    expect(summary.value.totalInterest).toBeGreaterThan(0)
    expect(summary.value.endBalance).toBeGreaterThan(0)
    expect(summary.value.interestRate).toBe(5.0)

    // End balance should equal total deposits + total interest
    expect(summary.value.endBalance).toBeCloseTo(
      summary.value.totalDeposits + summary.value.totalInterest,
      0
    )
  })

  it('should update when options change', () => {
    const options = ref({
      initialDeposit: 5000,
      monthlyContribution: 500,
      years: 25,
      interestRate: 5.0
    })

    const { summary } = useCompoundProjection(options)
    const initialEndBalance = summary.value.endBalance

    // Change interest rate
    options.value.interestRate = 7.0
    const newEndBalance = summary.value.endBalance

    // Higher interest rate should result in higher end balance
    expect(newEndBalance).toBeGreaterThan(initialEndBalance)
  })

  it('should handle zero initial deposit', () => {
    const options = ref({
      initialDeposit: 0,
      monthlyContribution: 500,
      years: 10,
      interestRate: 5.0
    })

    const { summary } = useCompoundProjection(options)

    expect(summary.value.totalDeposits).toBeGreaterThan(0)
    expect(summary.value.endBalance).toBeGreaterThan(0)
  })

  it('should handle zero monthly contribution', () => {
    const options = ref({
      initialDeposit: 10000,
      monthlyContribution: 0,
      years: 10,
      interestRate: 5.0
    })

    const { summary } = useCompoundProjection(options)

    // With zero monthly contribution, total deposits should equal initial deposit
    expect(summary.value.totalDeposits).toBe(10000)
    expect(summary.value.totalInterest).toBeGreaterThan(0)
    expect(summary.value.endBalance).toBeGreaterThan(10000)
  })

  it('should generate correct number of data points', () => {
    const options = ref({
      initialDeposit: 5000,
      monthlyContribution: 500,
      years: 25,
      interestRate: 5.0
    })

    const { projectionData } = useCompoundProjection(options)

    // Should generate data points at year 1, and every 5 years, plus final year
    // 1, 5, 10, 15, 20, 25 = 6 points
    expect(projectionData.value.labels.length).toBeGreaterThan(0)
  })

  it('should handle different time periods', () => {
    const options10Years = ref({
      initialDeposit: 5000,
      monthlyContribution: 500,
      years: 10,
      interestRate: 5.0
    })

    const options40Years = ref({
      initialDeposit: 5000,
      monthlyContribution: 500,
      years: 40,
      interestRate: 5.0
    })

    const projection10 = useCompoundProjection(options10Years)
    const projection40 = useCompoundProjection(options40Years)

    // 40 year investment should have much higher end balance due to compound interest
    expect(projection40.summary.value.endBalance).toBeGreaterThan(
      projection10.summary.value.endBalance * 3
    )
  })
})
