import React from "react";
import Layouts from "../../Layouts";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import { Details } from "./Details";
const ActionUserDetail = () => {
  return (
    <div>
      <React.Fragment>
        <Layouts>
          <div className="page-content overflow-auto ">
            <ActionMain
              Title={"Recommended Actions - Details"}
              Text={
                "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
              }
            />
            {Details.map((item) => (
              <div className="card">
                <div className="d-flex">
                  <div className="w-25  border-end custom-padding">
                    <div>
                      <span className="fs-7">{item.Title}</span>
                      <div>
                        <span className="span">{item.Detail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="w-25  border-end custom-padding">
                  <div>
                    <span className="fs-7">Weight</span>
                    <div>
                      <span className="span">Max</span>
                    </div>
                  </div>
                </div>
                <div className="w-25  border-end custom-padding">
                  <div>
                    <span className="fs-7">Status</span>
                    <div>
                      <span className="span">In Progess</span>
                    </div>
                  </div>
                </div>
                <div className="w-25  border-end custom-padding">
                  <div>
                    <span className="fs-7">Potential</span>
                    <div>
                      <span className="span">High</span>
                    </div>
                  </div>
                </div>
                <div className="w-25  border-end custom-padding">
                  <div>
                    <span className="fs-7">Cost</span>
                    <div>
                      <span className="span">Medium</span>
                    </div>
                  </div>
                </div>
                <div className="w-25  border-end custom-padding">
                  <div>
                    <span className="fs-7">Time scale</span>
                    <div>
                      <span className="span">Intermediate</span>
                    </div>
                  </div>
                </div>
                <div className="w-25  border-end custom-padding">
                  <div>
                    <span className="fs-7">Start Date</span>
                    <div>
                      <span className="span">12April, 2020 </span>
                    </div>
                  </div>
                </div>
                <div className="w-25  border-end custom-padding">
                  <div>
                    <span className="fs-7">Completion date</span>
                    <div>
                      <span className="span">09 Jan, 2022 </span>
                    </div>
                  </div>
                </div>
                <div className="w-25 border-end custom-padding">
                  <span className="fs-7 m-auto">Points</span>
                  <div>
                    <span className="span">23 </span>
                  </div>
                </div> */}
          </div>
        </Layouts>
      </React.Fragment>
    </div>
  );
};

export default ActionUserDetail;
