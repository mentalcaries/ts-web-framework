import axios, {AxiosResponse} from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: {[key: string]: Callback[]};
  baseURL: string;
  constructor(private data: UserProps) {
    this.baseURL = 'http://localhost:3000';
  }

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => callback());
  }

  fetch(): void {
    axios
      .get(`${this.baseURL}users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      axios.put(`${this.baseURL}/users/${id}`, this.data);
    }
    else{
      axios.post(`${this.baseURL}/users`, this.data)
    }
  }
}