export default function getUserId() {
    return localStorage.getItem("authToken");
}