import { fetchDelete, fetchSession, fetchUpdateWord, fetchLogin, fetchWord } from "./services";
import { render } from "./view";

const app = document.querySelector('#app');
const errorEl = document.querySelector('.error');

app.addEventListener('click', (e) => {
    if (e.target.classList.contains('login')) {
        const inputEl = document.querySelector('.input');
        const username = inputEl.value;
    
        fetchLogin(username)
        .catch( err => {
            if (err.error == 'network-error') {
                errorEl.innerHTML = `<p>Error: Please check your network connection</p>`;
                return;
            } else if (err.error == 'required-username') {
                errorEl.innerHTML = `<p>Error: Invalid username</p>`;
                return;
            } else if (err.error == 'auth-insufficient') {
                errorEl.innerHTML = `<p>Error: Wrong user - Dog is not welcomed</p>`;
                return;
            }
        } )
        .then( response => {
            fetchWord()
            .catch( err => {
                if (err.error == 'network-error') {
                    errorEl.innerHTML = `<p>Error: Please check your network connection</p>`;
                    return;
                } else if (err.error == 'auth-missing') {
                    errorEl.innerHTML = `<p>Error: No valid session</p>`;
                    return;
                }
            } )
            .then( response => {
                const { username, storedWord } = response;
                render(username, storedWord);
                errorEl.innerHTML = response.error ? errorEl.innerHTML : '';
            })
        });
        return;
    }
    
    if (e.target.classList.contains('update')) {
        const inputEl = document.querySelector('.input');
        const updatedWord = inputEl.value;

        fetchUpdateWord(updatedWord)
        .catch( err => {
            if (err.error == 'auth-missing') {
                errorEl.innerHTML = `<p>Error: No valid session</p>`;
                return;
            } else if (err.error == 'invalid-word') {
                errorEl.innerHTML = `<p>Error: Not a valid word</p>`;
                return;
            } else if (err.error == 'network-error') {
                errorEl.innerHTML = `<p>Error: Please check your network connection</p>`;
                return;
            }
        } )
        .then( response => {
            if (response) {
                const { username, storedWord } = response;
                render(username, storedWord);
                errorEl.innerHTML = response.error ? errorEl.innerHTML : '';
            }
            
            return;
        });
        return;
    }

    if (e.target.classList.contains('delete')) {
        fetchDelete()
        .catch( err => {
            if (err.error == 'network-error') {
                errorEl.innerHTML = `<p>Error: Please check your network connection</p>`;
                return;
            }
        } )
        .then( response => {
            errorEl.innerHTML = response.error ? errorEl.innerHTML : '';
            render('', '');
            return;
        });
    }
})

fetchSession()
.catch( err => {
    if (err.error == 'network-error') {
        errorEl.innerHTML = `<p>Error: Please check your network connection</p>`;
        return;
    } else if (err.error == 'auth-missing') {
        errorEl.innerHTML = `<p>Error: No valid session</p>`;
        return;
    }
} )
.then( response => {
    if (!response.error) {
        const { username } = response;
        fetchWord(username)
        .catch( err => {
            if (err.error == 'network-error') {
                errorEl.innerHTML = `<p>Error: Please check your network connection</p>`;
                return;
            } else if (err.error == 'auth-missing') {
                errorEl.innerHTML = `<p>Error: No valid session</p>`;
                return;
            }
        } )
        .then( response => {
            const { username, storedWord } = response;
            render(username, storedWord);
            errorEl.innerHTML = response.error ? errorEl.innerHTML : '';
            return;
        })
    } 

    render('', '');
});
