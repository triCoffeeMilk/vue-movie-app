/**
 * 검색(메인) 페이지 접근 후,
 * 헤더의 검색 탭이 활성화되어있는지 확인한다.
 * 
 * 영화 제목을 'frozen'으로, 표시 개수를 30개로 입력하고,
 * 'Apply'버튼을 눌러 검색한다.
 * 영화 목록 30개가 잘 출력되는지 확인한다.
 * 
 * 영화 목록에서 'Frozen II'(겨울왕국 2) 영화 아이템을 클릭한다.
 * 
 * 영화 상세 정보 페이지로 이동하고,
 * 헤더의 영화 탭이 활성화되어있는지 확인한다.
 * 상세 정보 페이지에서 정보를 확인한다.
 */

describe('영화 검색(겨울왕국2)', ()=> {
  it('검색 페이지 접근', () => {
    cy.visit('/')
    cy.get('header .nav-link.active')
      .contains('Search')
  })

  it('영화 검색', () => {
    cy.get('input.form-control')
      .type('frozen')
    cy.get('select.form-select:nth-child(2)')
      .select('30')
    cy.get('button.btn')
      .contains('Apply')
      .click()
    cy.wait(2000)
    cy.get('.movie')
      .should('have.length', 30)
  })

  it('영화 아이템 선택', () => {
    cy.get('.movie .title')
      .contains('Frozen II')
      .click()
  })

  it('영화 상세정보 확인', () => {
    cy.url()
      .should('include', '/movie/tt4520988')
    cy.wait(1000)
    cy.get('header .nav-link.active')
      .contains('Movie')
    cy.get('.title')
      .contains('Frozen II')
  })
})