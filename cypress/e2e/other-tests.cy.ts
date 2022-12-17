describe('Other tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('check wait', () => {
    cy.wait(2000)
  })

  it('intercept request', () => {
    cy.visit('/various/internetRequest')
    cy.intercept(
      'GET',
      'http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=6121cf598e22ddccef3fdd805f543efe&artist=bicep&track=apricots&format=json',
      {
        statusCode: 201,
        body: {
          track: {
            name: "Intercepted"
          },
        },
      },
    )
    cy.get('[id=internetRequestText]').should('contain', 'Intercepted')
  })
})
