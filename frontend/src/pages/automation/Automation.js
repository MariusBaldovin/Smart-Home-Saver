import React from "react";
import "./Automation.css";
import Frame from "../../components/frame/Frame";
import Location from "../../components/location/Location";
const Automation = () => {
  return (
    <div className="my-account-container">
      <Frame id="frame1" title="My Location">
        <p>
          <Location />
        </p>
      </Frame>
      <Frame id="frame2" title="Frame 2">
        <p>Content for frame 2...</p>
      </Frame>
      <Frame id="frame3" title="Frame 3">
        <p>Content for frame3...</p>
      </Frame>
      <Frame id="frame4" title="Frame 4">
        <p>Content for frame 4...</p>
      </Frame>
      <Frame id="frame5" title="Frame 5">
        <p>Content for frame 5...</p>
      </Frame>
      <Frame id="frame6" title="Frame 6">
        <p>Content for frame 6...</p>
      </Frame>
    </div>
  );
};

export default Automation;
