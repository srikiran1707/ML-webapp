const navigationMapper = {
  home: '',
  predictor: 'predictor',
  about: 'about',
  stats: 'predictor/stats',
}

const locale = (name) => {
  return navigationMapper[name]
}

export default locale
