export interface Alert {
  title: string;
  message: string;
  status: number;
}

interface Address {
  street: string | null;
}

interface Company {
  name: string | null;
}

export interface User {
  id: number | null;
  photo: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
  address: Address;
  company: Company;
}

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type FormCreateTodo = Pick<Todo, 'title', 'userId'>

export type FormEditTodo = Pick<Todo, 'title', 'id', 'userId'>

export interface UserLogged extends User {
  loggedAt: Date;
}

export interface FormCreateUser extends Omit<User, 'photo' | 'id'> {
  password: string | null;
}

export interface UserCreated extends Omit<User, 'photo' | 'id'> {
  createdAt: Date;
}

export interface JSONResponse {
  data?: Array | object;
  errors?: Array<{ message: string }>;
  message?: string;
  json: () => Promise<Object>;
  ok: Boolean;
}
