/*variables*/
const listaTweets = document.getElementById('lista-tweets');


/*Event Listeners*/
eventListeners();

function eventListeners(){
    /**Cuando se envia el formulario*/
    document.querySelector('#formulario').addEventListener('submit', addTweet);

    /**Borrar tweets */
    listaTweets.addEventListener('click', borrarTweet);

}


/*Funciones*/
function addTweet(e){
    e.preventDefault();

    /**Leer el valor del TextArea */
    const tweet = document.getElementById('tweet').value;

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

    /**Añadiendo a local storage */
    agregarTweetLocalStorage(tweet);

    /**Contenido cargado */
    document.addEventListener('DOMContentLoaded', localStorage);
}

function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove ();

        borrarTweetLocalStorage(e.target.parentElement.innerText);

        //console.log(e.target.parentElement.innerText);
    }
}

function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetLocalStorage();

    /**Añadiendo nuevo tweet al final del arreglo*/
    tweets.push(tweet);

     /**Convertir de string a arreglo para local storage */
    localStorage.setItem('tweets', JSON.stringify(tweets) );

    /**Add a local storage */
    //localStorage.setItem('tweets',tweet);    

}


/**Comprueba que haya elementos en el local storage y retorna un arreglo */
function obtenerTweetLocalStorage(){
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
function mostrarStorage(){
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

function borrarTweetLocalStorage(tweet){
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

    console.log(tweets);
};

