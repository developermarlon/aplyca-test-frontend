import { User, Alert } from "../interfaces/index"

export type FormLogin = Pick<User, 'email' | 'password' >
export type Alerts = Alert[];