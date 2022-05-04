import { UserInterface } from '../models/userInterface';

export function newUser():UserInterface{
  return {
    id: "",
    name: "",
    imagenUrl: "",
    uri:""
  }
}
