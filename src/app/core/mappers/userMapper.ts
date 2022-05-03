import { UserInterface } from "../models/userInterface";

export function SpotifyUser_apiToUser(user: SpotifyApi.CurrentUsersProfileResponse):UserInterface {
  return {
    id:user.id,
    name:user.display_name!,
    imagenUrl:user.images?.pop()?.url!,
    uri:user.uri
  }
}
