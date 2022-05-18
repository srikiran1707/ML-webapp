import { Typography, Divider } from '@mui/material'

const About = () => {
  return (
    <div className='container'>
      <div className='glassHeader'>
        <h2 className='header'>Stats for Machine Learning </h2>
      </div>
      <div className='multiGlass'>
        <div className='glassAbout'>
          <Typography variant='h4'>Team statistics</Typography>
          <Divider />
          <Typography variant='body1'>
            The raw statistics are too broad and hence not useful for our model.
            The actual statistics that will be useful are aggregate statistics
            which will help us gauge the overall performance of every team.
            Hence, we go through an entire previous season of basketball games
            in the National Basketball Association (NBA) and calculate the
            aggregate statistics for every team .
          </Typography>
          <Typography>
            Some of the formulae that we used were:
            <li>
              Point differential = Total points scored – Total points conceded
            </li>
            <li>
              Possessions = Field Goal Attempts + Turnovers + Opponent Fouls
            </li>
            <li>Offensive Rating = 100*(Total points / Total Possessions)</li>
            <li>
              Defensive Rating = 100*(Total points conceded / Total opponent
              possessions)
            </li>
            <li>Net Rating = Offensive Rating – Defensive Rating</li>
          </Typography>
        </div>
        <div className='glassAbout'>
          <Typography variant='h4'>Elo Rating</Typography>
          <Divider />
          <Typography>
            ELO rating is traditionally used to calculate the current strength
            of any team, taking into account it’s recent performances and giving
            considerable weight to the performance against oppositions with
            lower or higher ratings .
          </Typography>
          <Typography variant='body1'>
            The way Elo Ratings are calculated is simple : all teams start at a
            median score of 1500 and are either given or subtracted points based
            on the final score of each game and where it was played with weights
            being given to point difference, upsets, and location. In essence,
            it’s a more sophisticated win-loss record. Most NBA-prediction
            models don’t look at Elo Ratings but instead amalgamate a simple
            win-loss record with several other stats. We wanted to use Elo to
            appropriately weight quality wins (and losses), while also
            recognizing that not all teams are created equal .
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default About
