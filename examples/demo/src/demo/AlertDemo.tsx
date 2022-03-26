import { useState } from "react";
import { ButtonRight } from "./ButtonRight";
import { IconLeft } from "./IconLeft";
import {
  DemoReducerContextProvider,
  useDemoReducerContextState,
} from "./reducer";

export const AlertDemo = () => {
  return (
    <DemoReducerContextProvider>
      <ContainerWithIcon />
      <Container>
        <IconLeft />
      </Container>
      <ButtonRight />
      <Text />
    </DemoReducerContextProvider>
  );
};

const Container: React.FC = (props) => {
  return <div style={{ marginRight: 8 }}>{props.children}</div>;
};
const ContainerWithIcon = () => {
  return (
    <div style={{ marginRight: 8 }}>
      <IconLeft />
    </div>
  );
};

const Text = () => {
  const { alertText } = useDemoReducerContextState();
  return <>{alertText}</>;
};
