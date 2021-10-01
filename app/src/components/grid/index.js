import React from 'react'
import { Grid, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
const materials = [
{
  id: 1,
  name: 'icaro',
  descricao: 'blablablablabla'
},
{
  id: 2,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 3,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 4,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 5,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 6,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 7,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 8,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 9,
  name: 'renao',
  descricao: 'blebelbel'
},
{
  id: 10,
  name: 'renao',
  descricao: 'blebelbel'
},
]

function List() {
  return(
    <Grid container spacing={4}>
      {materials.map((material, index) => (
        <Grid item lg={3} md={4} sm={6} xs={12} display = "flex">
          <Box>
            <Typography
              style={{ fontWeight: 600 }}
              gutterBottom
              variant='body1'
              color='textPrimary'
            >
              {material.name}
            </Typography>
            <Typography
              display='block'
              variant='body2'
              color='textSecondary'
            >
              {material.descricao}
            </Typography>

          </Box>
          <Box>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
      </Grid>
  )}
export default List