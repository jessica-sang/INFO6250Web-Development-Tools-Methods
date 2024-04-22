export function fetchSession() {
    return fetch('/api/session')
    .catch( error => Promise.reject({ error: 'network-error'}))
    .then( response => {
        if(!response.ok) {
            return response.json().then( error => Promise.reject(error));
        }
        return response.json();
    })
}

export function fetchLogin(username) {
    return fetch('/api/session/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify( { username } ),
    })
    .catch( error => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if(!response.ok) {
            return response.json().then( error => Promise.reject(error) );
        }
        return response.json();
    })
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => { console.log('logout success'); })
}

export function fetchGetMessages() {
    return fetch('/api/messages')
    .catch( error => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if(!response.ok) return response.json().then( error => Promise.reject(error) );
        return response.json();
    })
}

export function fetchPostMessage(message) {
    return fetch('/api/message', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify( { message } )
    })
    .catch( error => Promise.reject({ error: 'network-error' }) )
    .then( response => {
        if(!response.ok) return response.json().then( error => Promise.reject(error) );
        return response.json();
    })
}