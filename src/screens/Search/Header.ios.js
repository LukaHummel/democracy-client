import React, { Component } from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Icons = styled(Ionicons.Button).attrs({
  color: "#fff",
  size: 30,
  backgroundColor: "transparent"
})``;

const SearchInputWrapper = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5.5;
  flex-direction: row;
  align-items: center;
  padding-left: 6;
`;

const SearchInputIcon = styled(Ionicons).attrs({
  color: "#7a797b",
  size: 16,
  backgroundColor: "transparent",
  name: "ios-search"
})``;

const SearchInput = styled.TextInput.attrs({
  clearButtonMode: "always",
  autoFocus: true,
  placeholderTextColor: "#7a797b",
  underlineColorAndroid: "transparent",
  selectionColor: "#000",
  returnKeyType: "search"
})`
  flex: 1;
  font-size: 14;
  height: 28;
  padding-horizontal: 6;
  color: #000;
`;

const SearchBackTextIos = styled.Button.attrs({
  color: "#fff"
})`
  padding-left: 8;
  font-size: 17;
`;

class Header extends Component {
  state = {
    searchContent: ""
  };

  clickBack = () => {
    const { navigator } = this.props;
    navigator.pop();
  };

  render() {
    const { searchContent } = this.state;
    return (
      <Wrapper>
        <SearchInputWrapper>
          <SearchInputIcon />
          <SearchInput
            placeholder="Suche"
            onChangeText={text => this.setState({ searchContent: text })}
            value={searchContent}
          />
        </SearchInputWrapper>

        <SearchBackTextIos title="Zurück" onPress={this.clickBack} />
      </Wrapper>
    );
  }
}

Header.propTypes = {
  navigator: PropTypes.instanceOf(Navigator)
};

Header.defaultProps = {
  navigator: undefined
};

export default Header;
