import { demoActionCreators, useDemoReducerContext } from "./reducer";

export const ButtonRight = () => {
  const { state, dispatch } = useDemoReducerContext();
  return (
    <button
      onClick={() => {
        const next = !state.clicked;
        dispatch(demoActionCreators.setClicked(next));
        dispatch(
          demoActionCreators.setAlertText(
            next ? "Benachrichtigung!" : "keine Benachrichtigung"
          )
        );
      }}
    >
      Click me
    </button>
  );
};
