import _ from 'lodash';
import lsr from 'lsr';

export default function getFiles(path, cb) {
  lsr(path, (e, nodes) => {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes)
      .filter(v => v.isFile() && v)
      .value());
  });
}
