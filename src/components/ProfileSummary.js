import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ProfileSummary = (props) => {
  const { name, title, summary } = props
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>
            {name}
            <Typography>{title}</Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{summary}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
export default ProfileSummary
