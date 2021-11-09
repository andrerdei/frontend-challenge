import api from "../api";
import {User} from "../../interfaces/User";
import {AxiosResponse} from "axios";

export async function getUsersList(endpoint: string): Promise<AxiosResponse> {
    return await api.get<User>(endpoint);
}

export async function createUser(endpoint: string, user: any): Promise<AxiosResponse> {
    return await api.post<User>(endpoint, user);
}

export async function deleteUser(endpoint: string): Promise<AxiosResponse> {
    return await api.delete<User>(endpoint);
}
