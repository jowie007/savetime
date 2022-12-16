describe('Various view', () => {
  beforeEach(() => {
    cy.visit('/various')
  })

  it('check image loader', () => {
    cy.visit('/various/imageLoader')
    // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get('[id=imageLoaderImage]')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
      })
  })

  it('check internet request', () => {
    cy.visit('/various/internetRequest')
    cy.get('[id=internetRequestText]').should('contain', 'Apricots')
  })

  it('check local request', () => {
    cy.visit('/various/localRequest')
    cy.get('[id=localRequestText]').should('contain', 'Leoniden')
  })

  it('check long text', () => {
    cy.visit('/various/longText')
    cy.get('[id=longTextText]').should('contain', 'thisWord')
  })

  it('check text awaiter', () => {
    cy.visit('/various/textAwaiter')
    cy.get('[id=textAwaiterText]').should('contain', 'Loaded')
  })

  it('check number generator', () => {
    cy.visit('/various/numberGenerator')
    cy.get('[id=number-99999]').should('exist').should('be.visible')
  })

  it('check everything', () => {
    cy.visit('/various/imageLoader')
    // https://stackoverflow.com/questions/51246606/test-loading-of-image-in-cypress
    cy.get('[id=imageLoaderImage]')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
      })
    cy.visit('/various/internetRequest')
    cy.get('[id=internetRequestText]').should('contain', 'Apricots')
    cy.visit('/various/localRequest')
    cy.get('[id=localRequestText]').should('contain', 'Leoniden')
    cy.visit('/various/longText')
    cy.get('[id=longTextText]').should('contain', 'thisWord')
    cy.visit('/various/textAwaiter')
    cy.get('[id=textAwaiterText]').should('contain', 'Loaded')
    cy.visit('/various/numberGenerator')
    cy.get('[id=number-99999]').should('exist').should('be.visible')
  })
})
