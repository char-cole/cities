import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const battutaKey = "ad3486b7c0cf4595f01223963f58f91a";

const ITEM_HEIGHT = 45;

class CountryMenu extends React.Component {
  state = {
    anchorEl: null,
    error: null,
    isLoaded: false,
    countryList: [],
    selectedCountry: []
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    const countryListArray = this.state.countryList;
    console.log(countryListArray[index]);
    this.setState({
      selectedCountry: countryListArray[index],
      anchorEl: null
    });
    console.log(this.state.selectedCountry)
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
              const tempo = result.map((item) => {
                return Object.values(item);
              })
              console.log(tempo);
              this.setState({
                isLoaded: true,
                countryList: tempo,
                selectedCountry: ["Chad", "td"]
              });
              console.log(this.state.countryList[0])
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
    const { anchorEl, error, isLoaded, countryList, selectedCountry } = this.state;
    console.log(selectedCountry);
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
              aria-label={selectedCountry[0]}
              onClick={this.handleClickListItem}
            >
              <ListItemText
                primary={selectedCountry[0]}
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
              key={option[1]}
              selected={index === countryList[index]}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <div>{option[0]}</div>
            </MenuItem>
            ))}
          </Menu>
        </div>
    );
  }
}
}

export default CountryMenu;
