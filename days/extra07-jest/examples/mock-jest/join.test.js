const { it } = require('@jest/globals')
const _ = require('lodash')
const join  = require('./join')

jest.mock('lodash')

it('join by ,', () => {
  join(['a', 'b'], ',')
  expect(_.join.mock.calls.length).toBe(1)
  expect(_.join.mock.calls[0][0]).toEqual(['a', 'b'])
  expect(_.join.mock.calls[0][1]).toBe(',')
})
