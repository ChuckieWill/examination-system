import {CHANGE_CURRENT} from './actionTypes'

export const getChangeIndex = (path) => ({
  type: CHANGE_CURRENT,
  path
})

