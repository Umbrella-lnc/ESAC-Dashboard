module.exports = function get_uri() {
    const url =
        process.env.NODE_ENV === "production"
            ? "https://esac-dashboard.herokuapp.com"
            : "http://localhost:5000";
    return url;
};
