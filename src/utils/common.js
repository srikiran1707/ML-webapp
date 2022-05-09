import { isNil, isEmpty } from 'ramda'

export const isNilorEmpty = (value) => {
  return isNil(value) || isEmpty(value)
}
