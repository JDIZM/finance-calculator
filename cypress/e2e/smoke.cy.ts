describe('Finance Calculator — smoke', () => {
  it('home page renders the hero and tier cards', () => {
    cy.visit('/')
    cy.contains('h1', 'Bold, chunky finance tools').should('be.visible')
    cy.contains('a', 'Compound interest').should('have.attr', 'href', '/compound-interest')
    cy.contains('a', 'Mortgage').should('have.attr', 'href', '/mortgage')
    cy.contains('a', 'Savings goal').should('have.attr', 'href', '/savings-goal')
  })

  it('compound interest page computes a projection from defaults', () => {
    cy.visit('/compound-interest')
    cy.contains('h1', 'How much will your money grow?').should('be.visible')
    cy.contains('Final balance').parent().should('contain.text', '£')
    cy.contains('Interest earned').parent().should('contain.text', '£')
  })

  it('mortgage page toggles between repayment and interest-only', () => {
    cy.visit('/mortgage')
    cy.contains('h1', 'What will the repayments be?').should('be.visible')
    cy.contains('button', 'Repayment').should('have.attr', 'aria-pressed', 'true')
    cy.contains('Monthly payment').should('be.visible')
    cy.contains('button', 'Interest-only').click()
    cy.contains('button', 'Interest-only').should('have.attr', 'aria-pressed', 'true')
    cy.contains('Monthly interest').should('be.visible')
  })

  it('savings-goal page shows a monthly contribution on default inputs', () => {
    cy.visit('/savings-goal')
    cy.contains('h1', 'Hit your number.').should('be.visible')
    cy.contains('Per month').parent().should('contain.text', '£')
  })

  it('early-payoff page reports months saved with a default extra', () => {
    cy.visit('/early-payoff')
    cy.contains('h1', 'Pay it off faster.').should('be.visible')
    cy.contains('Months saved').should('be.visible')
    cy.contains('Interest saved').parent().should('contain.text', '£')
  })

  it('fire page shows the FIRE number and years to FIRE', () => {
    cy.visit('/fire')
    cy.contains('h1', 'When can you stop working?').should('be.visible')
    // 40k annual spend / 4% WR = £1,000,000 FIRE target on default inputs
    cy.contains('£1,000,000').should('be.visible')
    cy.contains('Years to FIRE').should('be.visible')
  })
})
