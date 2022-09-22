import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut, deleteUser, updatePassword, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js'
/*
    const firebaseConfig = {
        apiKey: "AIzaSyCGJmVhr_u7280kYEDjyYPHae_W1JQv6EI",
        authDomain: "bible-bucks-dev.firebaseapp.com",
        projectId: "bible-bucks-dev",
        storageBucket: "bible-bucks-dev.appspot.com",
        messagingSenderId: "349955896107",
        appId: "1:349955896107:web:dcb10a8464656a46e2cb6e",
        measurementId: "G-WKE094RTVP"
    };
*/

const firebaseConfig = {
    apiKey: "AIzaSyCGJmVhr_u7280kYEDjyYPHae_W1JQv6EI",
    authDomain: "bible-bucks-dev.firebaseapp.com",
    projectId: "bible-bucks-dev",
    storageBucket: "bible-bucks-dev.appspot.com",
    messagingSenderId: "349955896107",
    appId: "1:349955896107:web:dcb10a8464656a46e2cb6e",
    measurementId: "G-WKE094RTVP"
};

function _0x521e () {
    const _0x1c5123 = ['50440PfERPI', '928939334435', '5946040aYXmmY', '623452fhWkYt', 'fir-javascript-b5efe', 'fir-javascript-b5efe.appspot.com', 'AIzaSyC6pCjKdKSbeNnl9ZwYWRbgdggvKOSEkQ8', '25IYHFxT', '119864kAlDES', '396411TGJpHL', '6kYJZuk', '5872gMscSr', 'G-NCYX6GF938', '126UUEtlQ', '432103MYfMQI'];
    _0x521e = function () {
        return _0x1c5123;
    };
    return _0x521e();
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const usr_email = document.getElementById('user_email');
const usr_passwd = document.getElementById('user_passwd');

export async function logIn () {
    await signInWithEmailAndPassword(auth, usr_email.value, usr_passwd.value)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                icon: 'success',
                title: 'Login Successfully',
                text: user.email
            })
            location.href = "classes.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorCode
            })
        });
}

export async function signUp () {
    await createUserWithEmailAndPassword(auth, usr_email.value, usr_passwd.value)
        .then((userCredential) => {
            const user = userCredential.user;
            Swal.fire({
                icon: 'success',
                title: 'Account Created Successfully',
                text: user.email
            })
            location.href = "classes.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorCode
            })
        });
}

export async function checkBeforeAuth () {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            location.href = "classes.html";
        }
    });
}

export async function checkAfterAuth () {
    await onAuthStateChanged(auth, (user) => {
        if (!user) {
            location.href = "index.html";
        } else {
            if (user.emailVerified === true) {
                document.getElementById("emailverifybtn").style.display = "none";
            }
            document.getElementById("profile_email").innerHTML = "Welcome! " + user.email;
        }
    });
}

export async function logOut () {
    await signOut(auth).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Logout Successfully'
        })
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    });
}

export async function resetPassword () {
    await sendPasswordResetEmail(auth, usr_email.value)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Password Reset Email Sent Successfully',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'ok',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = "index.html";
                }
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorCode
            })
        });
}

export async function delUser () {
    const user = auth.currentUser;
    await deleteUser(user).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'User Deleted Successfully'
        })
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    });
}

export async function changePassword () {
    const user = auth.currentUser;
    await updatePassword(user, usr_passwd.value).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Password Changed Successfully'
        })
    }).catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        })
    });
}

export async function emailVerify () {
    const auth = getAuth();
    const emailcheck = auth.currentUser.emailVerified;
    if (emailcheck === false) {
        await sendEmailVerification(auth.currentUser).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'E-mail Verification Send Successfully'
            })
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            })
        });
    }
}
