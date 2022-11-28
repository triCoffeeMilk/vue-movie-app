/**
 * 메인 페이지 접근 후,
 * Header의 About 탭을 클릭하면,
 * About 페이지에서 정보를 확인한다.
 * 
 * 그리고 잠시 Movie 페이지로 이동한 후,
 * Header의 사용자 로고를 클릭하면,
 * About 페이지로 이동하여 정보를 확인한다.
 */

describe('About 페이지로 이동', () => {
  it('메인 페이지로 접근', () => {
    cy.visit('.')
    cy.get('header .nav-link.active')
      .contains('Search')
  })

  it('About 페이지로 이동', () => {
    cy.get('header .nav-link')
      .contains('About')
      .click()
    cy.url()
      .should('include','/about')
    cy.wait(1000)
    cy.get('header .nav-link.active')
      .contains('About')
    cy.get('.name')
      .contains('JEAN')
  })

  it('영화 상세 페이지로 이동', () => {
    cy.get('header .nav-link')
      .contains('Movie').click()
    cy.url()
      .should('include','/movie')
  })

  it('About 페이지로 이동', ()=> {
    cy.get('header .user').click()
    cy.url()
      .should('include','/about')
    cy.wait(1000)
    cy.get('header .nav-link.active')
      .contains('About')
    cy.get('.name')
      .contains('JEAN')
  })
})