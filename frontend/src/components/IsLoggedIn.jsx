export default function IsLoggedIn() {
    return localStorage.getItem("authToken") !== null;
}

