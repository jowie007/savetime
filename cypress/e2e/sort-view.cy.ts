describe('Sort view', () => {
  beforeEach(() => {
    cy.visit('/sort')
  })

  it('check main content', () => {
    cy.contains('h1', 'You did it!')
  })

  it('check sort', () => {
    cy.get('[id=sort__buttons__mergeSort]').click()
    cy.get('[id=sort__item-7]').contains('Leoniden')
  })
})
