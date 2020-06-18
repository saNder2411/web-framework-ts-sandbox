import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';


interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = `http://localhost:3000/users`;

export class User {
  public attributes: Attributes<UserProps>;
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without id');
    }
    
    this.sync.fetch(id)
      .then(({ data }: AxiosResponse<UserProps>): void => this.set(data))
      .catch((error): void => console.log(error));
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((): void => this.trigger('save'))
      .catch(() => this.trigger('error'));

  }
   
}