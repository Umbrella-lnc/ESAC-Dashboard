import { createName } from '../functions/createName'

test('Tests Name Creation', () => {
  expect(createName('Eric', 'Andre')).toEqual('EricAndre')
})
