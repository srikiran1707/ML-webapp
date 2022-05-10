const navigationMapper = {
  home: '',
  predictor: 'predictor',
  about: 'about',
}

const locale = (name) => {
  return navigationMapper[name]
}

export default locale
