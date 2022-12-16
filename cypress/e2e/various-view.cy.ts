describe('Sort view', () => {
  beforeEach(() => {
    cy.visit('/sort')
  })

  it('check main content', () => {
    cy.contains('h1', 'You did it!')
  })

  it('check all sorts', () => {
    cy.get('[id=sort__buttons__insertionSort]').click()
    cy.get('[id=sort__item-7]').contains('Leoniden')
    cy.get('[id=sort__buttons__reset]').click()
    cy.get('[id=sort__item-7]').contains('Bicep')
    cy.get('[id=sort__buttons__bubbleSort]').click()
    cy.get('[id=sort__item-7]').contains('Leoniden')
    cy.get('[id=sort__buttons__reset]').click()
    cy.get('[id=sort__item-7]').contains('Bicep')
    cy.get('[id=sort__buttons__mergeSort]').click()
    cy.get('[id=sort__item-7]').contains('Leoniden')
    cy.get('[id=sort__buttons__reset]').click()
    cy.get('[id=sort__item-7]').contains('Bicep')
  })

  it('check insertionsort', () => {
    cy.get('[id=sort__buttons__insertionSort]').click()
    cy.get('[id=sort__item-7]').contains('Leoniden')
  })

  it('check bubblesort', () => {
    cy.get('[id=sort__buttons__bubbleSort]').click()
    cy.get('[id=sort__item-7]').contains('Leoniden')
  })

  it('check mergesort', () => {
    cy.get('[id=sort__buttons__mergeSort]').click()
    cy.get('[id=sort__item-7]').contains('Leoniden')
  })
})
