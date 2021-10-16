const { it } = require('@jest/globals')
const join = require('./join')
const combineString = require('./combineString')

jest.mock('./join')


it('combine string', () => {
  join.mockImplementationOnce(() => 'a b')
  const result = combineString(['a', 'b'])
  expect(result).toBe('a b')
})
