export type PartialValueIndexer<TKey extends string, TValue> = {
  readonly [K in TKey]?: TValue;
};

export type ValueIndexer<TKey extends string, TValue> = {
  readonly [K in TKey]: TValue;
};
