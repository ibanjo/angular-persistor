export interface IComponentPersistenceConfig {
  // per l'istanza del componente (argomento della direttiva)
}

interface IPropertyPersistenceConfig<TProp, TStorage> {
  prop: string;
  serialize(obj: TProp): TStorage;
  deserialize(obj: TStorage): TProp;
}

export interface IComponentPersistenceOptions {
  // per il decoratore
  fields: Array<string | IPropertyPersistenceConfig<never, never>>
  debounce?: number
}
