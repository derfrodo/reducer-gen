import type { TestFeatureType } from "TestFeature/types/TestFeatureType";

// Just a teststate - not really used in this app ;)
export default interface State {
  testFeatureType: TestFeatureType | null;
}
