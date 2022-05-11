import { isNil, isEmpty } from 'ramda'
import teams from '../constants/teams'

export const isNilorEmpty = (value) => {
  return isNil(value) || isEmpty(value)
}

export const filterTeamSelect = (value) => {
  return teams.filter((team) => team.abbreviation !== value)
}

export const getTeam = (teamName) => {
  if (isNilorEmpty(teamName)) return null
  return teams.find((team) => team.abbreviation === teamName)?.label
}
