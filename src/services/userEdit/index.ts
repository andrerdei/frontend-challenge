import api from "../api";
import {User} from "../../interfaces/User";
import {AxiosResponse} from "axios";

export async function getSpecificUser(endpoint: string): Promise<AxiosResponse> {
    return await api.get<User>(endpoint);
}

export async function editUser(endpoint: string, user: User): Promise<AxiosResponse> {
    return await api.put<User>(endpoint, user);
}
