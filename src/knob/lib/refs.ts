import * as Tone from 'tone'

export const refs = {
  player1: new Tone.Player().toDestination(),
  player2: new Tone.Player().toDestination(),
  loopNum: 0,
  usePlayer1: true,
}
