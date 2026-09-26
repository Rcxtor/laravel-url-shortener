
import api from "./api";

export function getUrls() {
    return api.get("/urls");
}

export function createUrl(urlData) {
    return api.post("/urls", urlData);
}

export function getUrl(id) {
    return api.get(`/urls/${id}`);
}

export function getUrlStats(id) {
    return api.get(`/urls/${id}/stats`);
}

export function deleteUrl(id) {
    return api.delete(`/urls/${id}`);
}
export function checkShortCode(code) {
    return api.get(`/check/${code}`);
}
export function createGuestUrl(urlData) {
    return api.post("/guest-urls", urlData);
}