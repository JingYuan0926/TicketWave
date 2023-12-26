import React from "react";
import { Grid, Container, Card, CardContent, Typography, CardActions, Button, Menu, MenuItem, IconButton } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Data from "../card-data.json";
import { Link } from 'react-router-dom';

export default function EventCard() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "35px" }}>
                    <Grid item>
                        <Typography variant="h4" align="left">
                            Upcoming Events
                        </Typography>
                    </Grid>
                    <Grid item>
                        
                        {/* Three buttons */}
                        {/* Button 1 is a drop down button */}
                        <Button variant="outlined" 
                        onClick={handleClick}
                        sx={{ borderRadius: "20px", marginRight: "30px", width: "140px", height: "40px", fontSize: "13px" }}>
                            Button 1
                            <IconButton size="small" sx={{ marginLeft: 1 }}>
                                <ArrowDropDownIcon />
                            </IconButton>
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            
                        >
                            <MenuItem onClick={handleClose}>Option 1</MenuItem>
                            <MenuItem onClick={handleClose}>Option 2</MenuItem>
                            <MenuItem onClick={handleClose}>Option 3</MenuItem>
                        </Menu>
                        
                        {/* Button 2, 3 is normal button */}
                        <Button variant="outlined" sx={{ borderRadius: "20px", marginRight: "30px", width: "120px", height: "40px", fontSize: "13px" }}>
                            Button 2
                        </Button>

                        <Button variant="outlined" sx={{ borderRadius: "20px", width: "120px", height: "40px", fontSize: "13px" }}>
                            Button 3
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={5} style={{ marginTop: "20px" }}>
                    {Data.map((result, index) => (
                        <Grid item xs={12} sm={4} ms={4} key={index}>
                            {/* Card will pop out abit */}
                            <Card
                                sx={{
                                    maxWidth: 270,
                                    height: 450,
                                    padding: "10px",
                                    marginBottom: "30px",
                                    transition: "transform 0.3s", // Add transition for a smooth effect
                                    "&:hover": {
                                        transform: "scale(1.05)", // Increase the scale on hover
                                    },
                                }}
                            >

                                {/* The posters */}
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={result.img}
                                        alt="Concert Poster"
                                        style={{ borderRadius: "5px", objectFit: "cover" }}
                                    />
                                    <CardContent sx={{ marginTop: '5px' }}>
                                        <Typography gutterBottom variant="h5" component="div" style={{ fontSize: "25px" }}>
                                            {result.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" style={{ fontSize: "16px" }}>
                                            {result.des}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>

                                {/* Only button on poster1 can link to payment page */}
                                <CardActions sx={{ marginTop: '5px' }}>
                                {index === 0 ? (
                    <Link to="/payment">
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          color: 'blue',
                          borderColor: 'blue',
                          '&:hover': {
                            color: 'white',
                            backgroundColor: 'blue',
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  ) : (
                    // customize the link for other cards
                    // button on poster2-6 link to other pages
                    <Link to={`/other-page-${index}`}>
                      <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                          color: 'blue',
                          borderColor: 'blue',
                          '&:hover': {
                            color: 'white',
                            backgroundColor: 'blue',
                          },
                        }}
                      >
                        Learn More
                      </Button>
                    </Link>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
