
     ██▒   █▓ ██▓▓█████▄ ▓█████  ▒█████    ▄████  ▄▄▄       ███▄ ▄███▓▓█████   ██████ 
    ▓██░   █▒▓██▒▒██▀ ██▌▓█   ▀ ▒██▒  ██▒ ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀ ▒██    ▒ 
     ▓██  █▒░▒██▒░██   █▌▒███   ▒██░  ██▒▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███   ░ ▓██▄   
      ▒██ █░░░██░░▓█▄   ▌▒▓█  ▄ ▒██   ██░░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄   ▒   ██▒
       ▒▀█░  ░██░░▒████▓ ░▒████▒░ ████▓▒░░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒▒██████▒▒
       ░ ▐░  ░▓   ▒▒▓  ▒ ░░ ▒░ ░░ ▒░▒░▒░  ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░▒ ▒▓▒ ▒ ░
       ░ ░░   ▒ ░ ░ ▒  ▒  ░ ░  ░  ░ ▒ ▒░   ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░░ ░▒  ░ ░
         ░░   ▒ ░ ░ ░  ░    ░   ░ ░ ░ ▒  ░ ░   ░   ░   ▒   ░      ░      ░   ░  ░  ░  
          ░   ░     ░       ░  ░    ░ ░        ░       ░  ░       ░      ░  ░      ░  
         ░        ░                                                                   

# VIDEOGAMES
I created this small web application in a weekend for a Local Area Network (LAN) Party for my friend Evan's bachelor party. We had a dedicated laptop connected to speakers and would use it to select the next game to play. It can also act as an MP3 player. 


Try it out [here](https://crisp-papa.github.io/party/)
> Note: The application was originally designed to be run in full screen. For the best user experience, enter full screen using ⌘ + <kbd>Shift</kbd> + F on Mac or <kbd>CTRL</kbd> + <kbd>Shift</kbd> + F on Windows.
## Features
### Game Selector
Games can be selected using the buttons on the right hand side of the application. There is a counter in the top right corner of each possible selection that keeps track of how many times you have selected that tile. 

<details>
<summary>Button Fig. 1</summary>

![buttons example](/img/game-buttons-example.png)
</details>

#### Button Explanation
- Spin
  - Randomly selects different tiles with a videogamey sound effect
- Stop
  - Stops on the current tile and plays a videogamey sound effect
- Reorder Tiles  
  - Change the order of the tiles displayed in the left hand column

### MP3 Player
The MP3 player uses a very simple implementation of the [`HTMLAudioElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement).

<details>
<summary>Button Fig. 2</summary>

![buttons example](/img/mp3-buttons-example.png)
</details>

#### Button Explanation
- Play
  - Plays the current track. If the song has been paused, it will resume at the place it was originally paused. 
- Pause
  - Pauses the track if currently playing.
- Loop  
  - Automatically loop the current track.
- Restart
  - Start the track over.
- Slow Down
  - Slow down the current track at an interval of 0.05. The minimum speed is 0.5.  
- Speed Up
  - Speed up the current track at an interval of 0.05. The maximum speed is 4X. 
- Normalize
  - Return the track to it's normal speed.
- New Song
  - Load the next song in the list.

There is also a display to show your current track speed. 