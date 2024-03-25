"use client";
import Stepper from "@keyvaluesystems/react-stepper";
import React from "react";

const Step = ({ style, index, trackID }) => {
  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#c44dff",
    }),
    ActiveNode: () => ({
      backgroundColor: "#c44dff",
    }),
    CompletedNode: () => ({
      backgroundColor: "#c44dff",
    }),
  };

  return (
    <Stepper
      styles={styles}
      orientation={style}
      steps={[
        {
          stepLabel: "Packing",
          stepDescription: (
            <p className="font-semibold text-sm">Order Placed</p>
          ),
          completed: index >= 0 ? true : false,
        },
        {
          stepLabel: "Shipped",
          stepDescription: (
            <p className="font-semibold text-sm">Ready to Ship</p>
          ),
          completed: index >= 1 ? true : false,
        },
        {
          stepLabel: "In Transit",
          stepDescription: (
            <p className="font-semibold text-sm">
              On the Way,
              <br /> {trackID}
            </p>
          ),
          completed: index >= 2 ? true : false,
        },
        {
          stepLabel: "Out For Delivery",
          stepDescription: (
            <p className="font-semibold text-sm">Arriving at Doorstep</p>
          ),
          completed: index >= 3 ? true : false,
        },
        {
          stepLabel: "Delivered",
          stepDescription: <p className="font-semibold text-sm">Reached You</p>,
          completed: index >= 4 ? true : false,
        },
      ]}
      currentStepIndex={index}
    />
  );
};

export default Step;
