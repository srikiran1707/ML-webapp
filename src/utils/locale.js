const navigationMapper = {
  home: '',
  predictor: 'predictor',
  about: 'about',
  'model comparision': 'modelstats',
}

const locale = (name) => {
  return navigationMapper[name]
}

export default locale
