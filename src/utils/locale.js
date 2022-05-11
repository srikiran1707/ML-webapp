const navigationMapper = {
  home: '',
  predictor: 'predictor',
  about: 'about',
  stats: 'predictor/stats',
  'model comparision': 'modelstats',
}

const locale = (name) => {
  return navigationMapper[name]
}

export default locale
