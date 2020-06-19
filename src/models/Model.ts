import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  get: <K extends keyof T>(key: K) => T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;

}

interface Events {
  on: (eventName: string, callback: () => void) => void;
  trigger: (eventName: string) => void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {

  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>, 
  ) {}

  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without id');
    }
    
    this.sync.fetch(id)
      .then(({ data }: AxiosResponse<T>): void => this.set(data))
      .catch((error): void => console.log(error));
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((): void => this.trigger('save'))
      .catch(() => this.trigger('error'));
  }

}
