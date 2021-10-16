const { sum, minus } = require('./math');

beforeAll(() => {
  console.log('beforeAll')
})

afterAll(() => {
  console.log('afterAll')
})

beforeEach(() => {
  console.log('beforeEach')
})

afterEach(() => {
  console.log('afterEach')
})

describe('sum', () => {
  beforeEach(() => {
    console.log('sum beforeEach')
  })

  afterEach(() => {
    console.log('sum afterEach')
  })

  it('adds 1 + 2 to equal 3', () => {
    console.log('sum test')
    expect(sum(1, 2)).toBe(3);
  });
})

describe('minus', () => {
  beforeEach(() => {
    console.log('minus beforeEach')
  })

  afterEach(() => {
    console.log('minus afterEach')
  })

  it('minus 2 - 1 to equal 1', () => {
    console.log('minus test')
    expect(minus(2, 1)).toBe(1);
  });
})
