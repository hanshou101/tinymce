import { FieldSchema, ValueSchema } from '@ephox/boulder';

import Fields from '../../data/Fields';
import DatasetStore from './DatasetStore';
import ManualStore from './ManualStore';
import MemoryStore from './MemoryStore';

export default <any> [
  FieldSchema.defaultedOf('store', { mode: 'memory' }, ValueSchema.choose('mode', {
    memory: MemoryStore,
    manual: ManualStore,
    dataset: DatasetStore
  })),
  Fields.onHandler('onSetValue'),
  FieldSchema.defaulted('resetOnDom', false)
];