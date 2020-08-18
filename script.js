
const apiURL = "https://api.lyrics.ovh"
function searchBtnHandler() {

    searchSong(searchValue.value);
    console.log("search button clicked")

}


//fetching data from server

function searchSong(searchKeys) {
    fetch(`${apiURL}/suggest/${searchKeys}`)
        .then(res => res.json())
        .then(data => {
            displayTitle(data.data)


            //displaying data in title & artist 

            function displayTitle(dataTaker) {
                let lyricList = document.getElementById("lyricsList")
                lyricList.innerHTML = ''

                for (let i = 0; i < 10; i++) {
                    const element = dataTaker[i];
                    const title = element.title;
                    const artist = element.artist.name
                    const album = element.album
                    const albumImage = element.album.cover

                    lyricList.innerHTML += `<div class="search-result   mx-auto py-4 row ">
                    <!-- single result -->
                    <div class="single-result row align-items-center my-3 p-3 text-center d-flex justify-content-between">
                        <div class="col-md-5 ">
                            <h3 class="lyrics-name" id="songTitle">${title}</h3>
                            <p class="author lead">Album by <span id="songArtist">${artist}</span></p>
                           
                            
                        </div>

                        <div class="col-md-3 ">
                            <img src ="${albumImage}">
                        </div>
                        
                        <div class="col-md-2 text-md-center text-center">
                        <button class="btn btn-success getLyrics "onclick="getLyricsBtnHandler('${artist}','${title}')" >Get Lyrics</button>
                        </div>
                    </div>`


                }






            }
        })



}

//getLyrics part

function getLyricsBtnHandler(artist, title) {
    const getLyrics = document.getElementsByClassName("getLyrics")
    for (let i = 0; i < getLyrics.length; i++) {
        const element = getLyrics[i];

        
            const songArtist = artist;
            const songTitle = title;
            fetch(`https://api.lyrics.ovh/v1/${songArtist}/${songTitle}`)

                .then(res => res.json())
                .then(function lyricsUpdate(data){
                   const lyricsName = data.lyrics
                     let getLyricsDisplay = document.getElementById("getLyricsDisplay");

                    getLyricsDisplay.innerHTML = `<button class="btn go-back" onclick="removeLyric()" >Go Back</button>
                         <h2 class="text-success mb-4">${songTitle}</h2>
                         <pre class="lyric text-white">${lyricsName}</pre>`


                     console.log(lyricsName)

                } 

                )
                     
            }

            function removeLyric() {
    
    
            const lyricsDisplay = document.getElementById("getLyricsDisplay")
            lyricsDisplay.remove()
    
    
    
    
    }
        }
                    



                



        





