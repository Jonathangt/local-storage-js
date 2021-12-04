/*variables*/
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = []

/*Event Listeners*/
eventListeners();

function eventListeners() {
    /**Cuando se envia el formulario*/
    formulario.addEventListener('submit', addTweet);

    /**Borrar tweets */
    //listaTweets.addEventListener('click', borrarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || []

        crearHtml()
    })
}


/*Funciones*/
function addTweet(e) {
    e.preventDefault();

    /**Leer el valor del TextArea */
    const tweet = document.querySelector('#tweet').value;

    if (tweet=='') {
        mostrarError('El tweet no puede ir vacío')
        return
    }

    const tweetObj = {
        id:Date.now(),
        tweet,
    }

    tweets = [...tweets, tweetObj]

    crearHtml()

    //reset forms
    formulario.reset()

    agregarTweetLocalStorage()

}

const crearHtml = () => {

    limpiarHtml()
    
    if (tweets.length>0) {
        tweets.forEach(tweet =>{
            //add btn eliminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerHTML = 'X'

            //add  fcn de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id)
            }

            //crea html
            const li = document.createElement('li');
            //añade el txt
            li.innerText = tweet.tweet;

            //asignar el btn
            li.appendChild(btnEliminar)

            /**Añadiendo boton de borrar al tweet */
            listaTweets.appendChild(li);
        })
    }
}

const limpiarHtml = () => {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}


const borrarTweet = (id) => {
    tweets = tweets.filter( t => t.id !== id)

    crearHtml()
}

const agregarTweetLocalStorage = () => {
    /**Convertir de string a arreglo para local storage */
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}


/**Comprueba que haya elementos en el local storage y retorna un arreglo */
const obtenerTweetLocalStorage = () => {
    let tweets;

    /**Revisar los valores de local storage */
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

/**Muestra los datos del local storage */
const mostrarStorage = () => {
    let tweets;
    tweets = obtenerTweetLocalStorage();

    tweets.forEach(function(tweet) {
         /**Crea boton eliminar */
        const buttonDelete = document.createElement('a');
        buttonDelete.classList = 'borrar-tweet';
        buttonDelete.innerText = 'X';

        /**Crando elemento y añadiendo contenido a la lista */
        const li = document.createElement('li');
        li.innerText = tweet;

        /**Añadiendo boton de borrar al tweet */
        li.appendChild(buttonDelete);

        /** Add el tweet a la lista */
        listaTweets.appendChild(li);
        
    });
}

const borrarTweetLocalStorage = (tweet) => {
    let tweets, tweetBorrar;

    /**Elimina la x del tweet */
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetLocalStorage();

    tweets.forEach(function(tweet, index){
       if(tweetBorrar === tweet){
            tweets.splice(index, 1);
       }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));

    //console.log(tweets);
};

const mostrarError = (txt) => {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = txt
    mensajeError.classList.add('error')

    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}