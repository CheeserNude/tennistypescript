import { TennisGame } from './TennisGame';

export class TennisGame1 implements TennisGame {
  private player1: Player = new Player()
  private player2: Player = new Player()

  constructor(player1Name: string, player2Name: string) {
    this.player1.setName = player1Name;
    this.player2.setName = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.getName)
      this.player1.incrementScore();
    else
      this.player2.incrementScore();
  }

  getScore(): string {
    let score: string;
    if (this.player1.getScore === this.player2.getScore) {
      switch (this.player1.getScore) {
        case Score.Love:
          score = 'Love-All';
          break;
        case Score.Fifteen:
          score = 'Fifteen-All';
          break;
        case Score.Thirty:
          score = 'Thirty-All';
          break;
        default:
          score = 'Deuce';
          break;

      }
    }
    else if (this.player1.getScore > Score.Forty || this.player2.getScore > Score.Forty) {
      const scoreDifference: number = this.player1.getScore - this.player2.getScore;
      if (scoreDifference === 1) score = 'Advantage ' + this.player1.getName;
      else if (scoreDifference >= 2) {
        score = 'Win for ' + this.player1.getName;
        this.endGame(this.player1.getName);
      }
      else if (scoreDifference === -1) score = 'Advantage ' + this.player2.getName;
      else {
        score = 'Win for ' + this.player2.getName;
        this.endGame(this.player2.getName)
      }
    }
    else {
        score = this.displayScore(this.player1.getScore) + '-' + this.displayScore(this.player2.getScore);
    }
    return score;
  }

  displayScore(score: number): string{
    if(score == Score.Love) return 'Love';
    else if(score == Score.Fifteen) return 'Fifteen';
    else if(score == Score.Thirty) return 'Thirty';
    else return 'Forty';
  }

  endGame(winner:string): void{
    this.player1.resetScore();
    this.player2.resetScore();

    if(winner === this.player1.getName)
      this.player1.gameWon();
    else this.player2.gameWon();

    if(this.player1.getGames == 6 || this.player2.getGames == 6){
      this.endSet();
    }
  }

  endSet():void{
    if(this.player1.getGames == 6){
      this.player1.incrementSets();
    }else
      this.player2.incrementSets()

    this.player1.resetGames();
    this.player2.resetGames();
  }

}
enum Score{
  Love,
  Fifteen,
  Thirty,
  Forty
}

class Player{
  private name: string = "";
  private score: number;
  private games: number;
  private sets: number;

  constructor() {
    this.score = Score.Love;
    this.games = 0;
    this.sets = 0;
  }

  public get getName(){
    return this.name
  }
  public set setName(name: string){
    this.name = name;
  }

  public incrementScore(): void{
    this.score++;
  }
  public get getScore(){
    return this.score;
  }

  public resetScore(): void{
    this.score = Score.Love;
  }

  public get getGames(){
    return this.games;
  }

  public gameWon(): void{
    this.games++;
  }

  public resetGames(): void{
    this.games = 0;
  }

  public get getSets(): number{
    return this.sets;
  }

  public incrementSets() : void{
    this.sets++;
  }
}
