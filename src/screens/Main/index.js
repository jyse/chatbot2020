import React, { Component } from "react";
import { auth, firestore } from "../../firebase";
import { withRouter } from "react-router-dom";
import "./Main.css";
import SideNavigation from "../../components/SideNavigation";
import ToolBar from "../../components/ToolBar";
import UserDashboardGrid from "../../components/UserDashboardGrid";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavigationOpen: false,
    };
  }

  sideNavToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideNavigationOpen: !prevState.sideNavigationOpen };
    });
  };

  userDashboardGridClickHandler = () => {
    this.setState({ sideNavigationOpen: false });
  };

  render() {
    let userDashboardGrid;

    if (this.state.sideNavigationOpen) {
      userDashboardGrid = (
        <UserDashboardGrid click={this.userDashboardGridClickHandler} />
      );
    } else {
      userDashboardGrid = <UserDashboardGrid />;
    }

    return (
      <div>
        <ToolBar sideNavToggleClickHandler={this.sideNavToggleClickHandler} />
        <SideNavigation show={this.state.sideNavigationOpen} />
        {userDashboardGrid}
      </div>
    );
  }
}
export default withRouter(Main);
