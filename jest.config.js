module.exports = {
  // 파일 확장자를 지정하지 않을 경우, 기본적으로 검색할 확장자 목록
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  // ~ 별칭을 구성
  // <rootDir> 토큰을 이용해 루트 경로를 참조할 수 있다.
  moduleNameMapper : {
    '^~/(.*)$' : '<rootDir>/src/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist',
    '<rootDir>/cypress'
  ],
  // jsdom 환경에 대한 URL 설정
  // HTML 환경
  testURL: 'http://localhost',

  // jest에서 테스트할 수 있는 모듈로 바꿔야한다.
  // 정규식과 일치하는 파일의 변환 모듈 지정
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  }
}