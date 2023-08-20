export const formattedNumber = (num: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(num)
}

export const formattedPercentage = (num: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'percent'
  }).format(num)
}
