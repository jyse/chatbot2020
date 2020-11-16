import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./PageLayout.css";
import SideNavigation from "./SideNavigation";
import ToolBar from "./ToolBar";
import UserDashboardGrid from "./UserDashboardGrid";

class PageLayout extends Component {
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
        <UserDashboardGrid
          click={this.userDashboardGridClickHandler}
          greeting="hello"
        />
      );
    } else {
      console.log("sideNav is closed");
      userDashboardGrid = <UserDashboardGrid test="test" />;
    }

    return (
      <div>
        <ToolBar sideNavToggleClickHandler={this.sideNavToggleClickHandler} />
        <SideNavigation show={this.state.sideNavigationOpen} />
        {/* {userDashboardGrid} */}
        {this.props.children}
      </div>
    );
  }
}
export default withRouter(PageLayout);
