import { createName } from './createName'

test('Tests Name Creation', () => {
  expect(createName('Eric', 'Andre')).toEqual('EricAndre')
})
