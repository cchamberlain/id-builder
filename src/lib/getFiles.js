import _ from 'lodash';
import log from 'loglevel'
import lsr from 'lsr';

import promise from './promise';

export default async function getFiles(path) {
  // TODO: Why is it two wrapped arrays?
  const paths = (await promise.promiseFromNodeCallback(lsr, path))[0];

  return _.filter(paths, v => v.isFile() && v);
}
