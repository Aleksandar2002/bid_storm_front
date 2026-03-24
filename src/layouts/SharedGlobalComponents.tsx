import React from "react";
import Dialog from "../shared/components/global/dialogs/Dialog";
import Loader from "../shared/components/global/Loader";
import ToastMessage from "../shared/components/global/ToastMessage";
import GoToTop from "../shared/components/global/GoToTop";

const SharedGlobalComponents = () => {
  return (
    <>
      <Loader />
      <ToastMessage />
      <Dialog />
      <GoToTop />
    </>
  );
};

export default SharedGlobalComponents;
