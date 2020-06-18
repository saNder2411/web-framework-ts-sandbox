import Axios, { AxiosResponse } from 'axios';


interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;


export class User {

  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps ) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    this.events[eventName] = [...handlers, callback];
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
 
    if (!handlers || handlers.length === 0) return;
    
    handlers.forEach((callback) => callback());
  }

  fetch(): void {
      Axios.get(`http://localhost:3000/users/${this.get('id')}`)
        .then((response: AxiosResponse<UserProps>) => this.set(response.data))
        .catch((error) => console.log(error))
  }

  save(): void {
    const id = this.get('id')

    if (id) {
      Axios.put(`http://localhost:3000/users/${id}`, this.data)
    } else {
      Axios.post(`http://localhost:3000/users`, this.data)
    }
  }
   
}