import { SpaceEntryInterface } from "../model/Model";

class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected`);
  }
}

const validateAsSpaceEntry = (arg: any) => {
  if ((arg as SpaceEntryInterface).location === undefined) {
    throw new MissingFieldError("location");
  }
  if ((arg as SpaceEntryInterface).name === undefined) {
    throw new MissingFieldError("name");
  }
  if ((arg as SpaceEntryInterface).id === undefined) {
    throw new MissingFieldError("id");
  }
};

export { validateAsSpaceEntry, MissingFieldError };
