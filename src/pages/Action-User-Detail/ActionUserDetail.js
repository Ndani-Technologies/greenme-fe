import React, { useState } from "react";
import Layouts from "../../Layouts";
import ActionMain from "../Recomended-Action-Main/ActionMain";
import { Details } from "./Details";
import { Button, Col, Input } from "reactstrap";
import { Links } from "./Details";
import StarsRating from "./StarsRating";
import { useFormik } from "formik";
const ActionUserDetail = () => {
  const [value, setValue] = useState(1);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      relevant: 0,
      difficult: 0,
      impactful: 0,
      init: 5,
    },
    onSubmit: (values) => {
      console.log("in handle submit", values);
    },
  });
  return (
    <div>
      <React.Fragment>
        <div className="page-content overflow-auto ">
          <ActionMain
            Title={"Recommended Actions - Details"}
            Text={
              "Lorem ipsum dolor sit amet consectetur. A tellus arcu lacus vestibulum integer massa vel sem id. Mi quis a et quis. Rhoncus mattis urna adipiscing dolor nam sem sit vel netus. Egestas vulputate adipiscing aenean tellus elit commodo tellus. Tincidunt sit turpis est dolor convallis viverra enim aliquet euismod. "
            }
          />
          <div className="card">
            <div className="d-flex">
              {Details.map((item, index) => (
                <div
                  className={`w-25 p-2 ${
                    index === Details.length - 1
                      ? "custom-padding"
                      : "border-end custom-padding"
                  }`}
                >
                  <span className="fs-7">{item.Title}</span>
                  <div>
                    <span className="span">{item.Detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-around align-items-center border-bottom pb-4">
            <div>
              <Col className="mb-5" lg={6}>
                <h4>Description</h4>
                <Input
                  type="text"
                  placeholder="Some description should go  here"
                />
              </Col>
              <div>
                <h4 className="mb-4">Resource Links</h4>
                {Links.map((item) => (
                  <div className="hover">
                    <div className="Links">
                      <a>{item.Link}</a>
                      <span>{item.Icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="Feeedback">
              <h4>
                Here you can leave some feedback / experience that you have had.
              </h4>

              <textarea
                className="w-100 p-2"
                rows={10}
                placeholder="Leave us some feed back here"
              />
              <Button>Send</Button>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
          >
            <Col className="d-flex align-items-center justify-content-between pt-3">
              <Col className="Stars">
                <h4>Please leave a rating </h4>
                <div className="Rating">
                  <StarsRating
                    Title="Relevant"
                    Rating={` ${validation.values.relevant} out of 5`}
                    validation={validation}
                    value={value}
                  />
                  <StarsRating
                    Title="Difficult"
                    Rating={`${validation.values.difficult} out of 5`}
                    value={value}
                    validation={validation}
                  />
                  <StarsRating
                    Title="Impactful"
                    Rating={`${validation.values.impactful} out of 5`}
                    value={value}
                    validation={validation}
                  />
                </div>
              </Col>
              <Col className="Touch">
                <p>
                  Get in touch with the administrator <br /> for any
                  clarification need.
                </p>
                <Button>Contact Administrator</Button>
              </Col>
              <Col className="d-flex justify-content-center gap-2">
                <Button
                  onClick={() => {
                    setValue(0);
                    validation.resetForm();
                  }}
                >
                  Reset
                </Button>
                <Button type="submit">Save</Button>
                <Button>Complete</Button>
              </Col>
            </Col>
          </form>
        </div>
      </React.Fragment>
    </div>
  );
};

export default ActionUserDetail;
