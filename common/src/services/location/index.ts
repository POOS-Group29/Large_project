import type { KyInstance } from "ky";

import _create from "./create";
import _delete from "./delete";
import _list from "./list";
import _retrieve from "./retrieve";
import _search from "./search";
import _update from "./update";

export default (authenticatedInstance: KyInstance) => ({
  list: _list(authenticatedInstance),
  create: _create(authenticatedInstance),
  update: _update(authenticatedInstance),
  delete: _delete(authenticatedInstance),
  retrieve: _retrieve(authenticatedInstance),
  search: _search(authenticatedInstance),
});
