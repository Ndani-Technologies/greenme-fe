import React from "react";
import DiscussionMain from "../Discussion-Main/DiscussionMain";
import DashboardTabs from "./DashboardTabs";

const DiscussionDashboard = () => {
  return (
    <React.Fragment>
      <div className="page-content overflow-auto ">
        <DiscussionMain title={"Discussion Dashboard"} />
        <DashboardTabs />
      </div>
    </React.Fragment>
  );
};

export default DiscussionDashboard;
