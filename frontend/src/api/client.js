const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
    const { body, headers = {}, ...fetchOptions } = options;

    const isFormData =
        body instanceof FormData;

    const requestHeaders = {
        ...headers,
    };

    if (!isFormData && body !== undefined && body !== null) {
        requestHeaders["Content-Type"] ??= "application/json";
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        credentials: "include",
        headers: requestHeaders,
        body,
        ...fetchOptions,
    });

    if (!response.ok) {
        let errorMessage = `Request failed (${response.status})`;

        try {
            const error = await response.json();

            if (typeof error.detail === "string") {
                errorMessage = error.detail;
            } else if (Array.isArray(error.detail)) {
                errorMessage = error.detail
                    .map((item) => item.msg)
                    .filter(Boolean)
                    .join(", ");
            }
        } catch {
            // response body isnt JSON
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

function serializeBody(body) {
    if (body instanceof FormData) {
        return body;
    }

    return body === undefined || body === null
        ? undefined
        : JSON.stringify(body);
}

export const api = {
    get(endpoint, options = {}) {
        return request(endpoint, {
            ...options,
            method: "GET",
        });
    },

    post(endpoint, body, options = {}) {
        return request(endpoint, {
            ...options,
            method: "POST",
            body: serializeBody(body),
        });
    },

    put(endpoint, body, options = {}) {
        return request(endpoint, {
            ...options,
            method: "PUT",
            body: serializeBody(body),
        });
    },

    patch(endpoint, body, options = {}) {
        return request(endpoint, {
            ...options,
            method: "PATCH",
            body: serializeBody(body),
        });
    },

    delete(endpoint, options = {}) {
        return request(endpoint, {
            ...options,
            method: "DELETE",
        });
    },
};
