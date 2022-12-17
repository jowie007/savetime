describe('About view', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('check main content', () => {
    cy.contains('h1', 'You did it!')
  })

  it('check secondary content', () => {
    cy.contains('h1', 'This is an about page')
  })

  it('route to home page', () => {
    cy.contains('a', 'Home').click()
  })
})
