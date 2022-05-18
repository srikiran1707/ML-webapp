import { Typography, Divider } from '@mui/material'
const Home = () => {
  return (
    <div className='container'>
      <div className='glassHeader'>
        <h2 className='header'>Nba Winner Prediction</h2>
      </div>
      <div className='multiGlass'>
        <div className='glassAbout'>
          <Typography variant='h4'>Purpose</Typography>
          <Divider />
          <Typography>
            Sports are some of the most viewed and universally liked events in
            the entertainment industry. Although sports were initially a way for
            athletes to push the limits of the human body in a competitive
            environment, they have become a major source of entertainment and
            revenue across the world.
          </Typography>
          <Typography>
            One of the most intriguing parts of sports is the unpredictable
            nature of it, where two or more teams or players compete for
            “victory” in that game. In an ideal world, if two teams played a
            match, there would be an equal chance that either team could win it.
            However, this is not the case, since in most cases, there are
            various factors such as team strength, current form, strategy, and
            home field advantage - which change the probability of the outcome.
            Hence, predicting the results of such events is a complex task.
          </Typography>
        </div>
        <div className='glassAbout'>
          <Typography variant='h4'>Proposed System</Typography>
          <Divider />
          <Typography>
            This project consists of a machine learning model - Logistic
            Regression , which aims to predict the outcome of any given match,
            considering all the stated factors.
          </Typography>
          <Typography>
            Our main objective is to find the key factors that affect the match
            outcome and select the best machine learning model that best fits
            this data and gives the best results. These factors include, but are
            not limited to rules of the game, skill of the players, current
            performance of the team, and so on.
          </Typography>
          <Typography>
            We use an “ELO” system to rank the strength of the teams, where a
            higher score indicates a stronger team. The result that the model
            outputs will be a match-by-match outcome, which will change the elo
            rating after the actual result of the match.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Home
