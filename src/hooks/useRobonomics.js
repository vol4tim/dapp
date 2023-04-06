import { Robonomics } from "robonomics-interface";

export function useRobonomics() {
  try {
    return Robonomics.getInstance();
  } catch (e) {
    console.log(e);
  }
}
