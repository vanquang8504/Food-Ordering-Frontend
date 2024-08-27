import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import React from 'react'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: '',
  location: '',
  name: '',
  startedAt: null,
  endAt: null
}
export const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = React.useState(initialValues)
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues(initialValues)

    console.log("submit", formValues);
  };
  const handleFormOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleDateChange = (date, dateType) => {
    const formattedDate = dayjs(date).format("MMM dd, yyyy HH:mm a")
    setFormValues({...formValues, [dateType] : formattedDate})
  }
  return (
    <div>
      <div className="p-5">
        <Button onClick={handleOpen} variant='contained'>Create New Event</Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={formValues.image}
                    onChange={handleFormOnChange}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formValues.location}
                    onChange={handleFormOnChange}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Event Name"
                    name="name"
                    value={formValues.name}
                    onChange={handleFormOnChange}
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={props => <TextField {...props} />}
                      label="Start Date And Time"
                      value={formValues.startedAt}
                      onChange={(newValue) => handleDateChange(newValue, 'startedAt')}
                      className='w-full'
                      sx={{ width: "100%" }}
                    ></DateTimePicker>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={props => <TextField {...props} />}
                      label="End Date And Time"
                      value={formValues.endAt}
                      onChange={(newValue) => handleDateChange(newValue, 'endAt')}
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className='w-full'
                      sx={{ width: "100%" }}
                    ></DateTimePicker>
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <Button onClick={handleSubmit} variant='contained'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  )
}
