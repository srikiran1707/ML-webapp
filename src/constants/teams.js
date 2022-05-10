const teams = [
  {
    abbreviation: 'ATL',
    label: 'Atlanta Hawks',
  },
  {
    abbreviation: 'BOS',
    label: 'Boston Celtics',
  },
  {
    abbreviation: 'CHI',
    label: 'Chicago Bulls',
  },
  {
    abbreviation: 'CLE',
    label: 'Cleveland Cavaliers',
  },
  {
    abbreviation: 'DAL',
    label: 'Dallas Mavericks',
  },
  {
    abbreviation: 'DEN',
    label: 'Denver Nuggets',
  },
  {
    abbreviation: 'DET',
    label: 'Detroit Pistons',
  },
  {
    abbreviation: 'GSW',
    label: 'Golden State Warriors',
  },
  {
    abbreviation: 'HOU',
    label: 'Houston Rockets',
  },
  {
    abbreviation: 'IND',
    label: 'Indiana Pacers',
  },
  {
    abbreviation: 'LAC',
    label: 'Los Angeles Clippers',
  },
  {
    abbreviation: 'LAL',
    label: 'Los Angeles Lakers',
  },
  {
    abbreviation: 'MEM',
    label: 'Memphis Grizzlies',
  },
  {
    abbreviation: 'MIA',
    label: 'Miami Heat',
  },
  {
    abbreviation: 'MIL',
    label: 'Milwaukee Bucks',
  },
  {
    abbreviation: 'MIN',
    label: 'Minnesota Timberwolves',
  },
  {
    abbreviation: 'NOP',
    label: 'New Orleans Pelicans',
  },
  {
    abbreviation: 'NYK',
    label: 'New York Knicks',
  },
  {
    abbreviation: 'OKC',
    label: 'Oklahoma City Thunder',
  },
  {
    abbreviation: 'ORL',
    label: 'Orlando Magic',
  },
  {
    abbreviation: 'PHI',
    label: 'Philadelphia 76ers',
  },
  {
    abbreviation: 'POR',
    label: 'Portland Trail Blazers',
  },
  {
    abbreviation: 'SAC',
    label: 'Sacramento Kings',
  },
  {
    abbreviation: 'SAS',
    label: 'San Antonio Spurs',
  },
  {
    abbreviation: 'TOR',
    label: 'Toronto Raptors',
  },
  {
    abbreviation: 'UTA',
    label: 'Utah Jazz',
  },
  {
    abbreviation: 'WAS',
    label: 'Washington Wizards',
  },
]

export const getTeam = (teamName) => {
  return teams.find((team) => team.abbreviation === teamName)?.label
}

export default teams
