import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const battutaKey = "ad3486b7c0cf4595f01223963f58f91a";

const ITEM_HEIGHT = 45;

class CountryMenu extends React.Component {
  state = {
    anchorEl: null,
    error: null,
    selectedIndex: 0,
    isLoaded: false,
    countryList: [],
    selectedCountry: {
      code: this.state.countryList[this.state.selectedIndex].code,
      name: this.state.countryList[this.state.selectedIndex].name
    }
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
  this.setState({ selectedIndex: index, anchorEl: null });
};

  handleClose = () => {
    this.setState({
      anchorEl: null,
      });
  };

  componentDidMount() {
    fetch("http://battuta.medunes.net/api/country/all/?key="+battutaKey)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
              this.setState({
                isLoaded: true,
                countryList: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
  }

  render() {
    const { anchorEl, error, selectedIndex, isLoaded, countryList, selectedCountry } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label={this.state.selectedCountry.name}
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary={this.state.selectedCountry.name}
                secondary={countryList[this.state.selectedIndex]}
              />
            </ListItem>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 6,
                maxWidth: 400,
              },
            }}
          >
            {countryList.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
    );
  }
}
}

export default CountryMenu;
