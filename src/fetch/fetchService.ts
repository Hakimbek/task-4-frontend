import { toast } from 'react-toastify';

export const baseUrl = "https://task-4-backend-81mc.onrender.com";

const fetchService = async (url: string, method: string, body?: Object) => {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })
    const json = await response.json();

    if (json.statusCode === 200) {
        showMessage(json.message, toast.success);
    } else if (json.statusCode === 405) {
        window.location.href = '/login';
    } else {
        showMessage(json.message, toast.error);
    }

    return json;
}

export const signUp = async (email: string, username: string, password: string) => {
    return await fetchService(`${baseUrl}/auth/signup`, 'POST', { email, username, password });
}

export const logIn = async (email: string, password: string) => {
    return await fetchService(`${baseUrl}/auth/login`, 'POST', { email, password });
}

export const validateToken = async () => {
    return await fetchService(`${baseUrl}/auth/validate`, 'GET');
}

export const getUsers = async () => {
    return await fetchService(`${baseUrl}/user`, 'GET');
}

export const deleteUsers = async (ids: string[]) => {
    return await fetchService(`${baseUrl}/user`, 'DELETE', { ids });
}

export const disableUsers = async (ids: string[]) => {
    return await fetchService(`${baseUrl}/user/disable`, 'PATCH', { ids });
}

export const activateUsers = async (ids: string[]) => {
    return await fetchService(`${baseUrl}/user/activate`, 'PATCH', { ids });
}

const showMessage = (message: string | string[], show: (msg: string) => void) => {
    Array.isArray(message) ? message.forEach(msg => show(msg)) : show(message);
}