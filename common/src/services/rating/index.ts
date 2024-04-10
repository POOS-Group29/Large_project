import type { KyInstance } from "ky";

import _create from "./create";
import _update from "./update";

export default (authenticatedInstance: KyInstance) => ({
  create: _create(authenticatedInstance),
  update: _update(authenticatedInstance),
});
