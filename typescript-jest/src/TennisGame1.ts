import { TennisGame } from './TennisGame';

export class TennisGame1 implements TennisGame {
  private player1: Player = new Player();
  private player2: Player = new Player();

  constructor(player1Name: string, player2Name: string) {
    this.player1.fullName = player1Name;
    this.player2.fullName = player2Name;
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.fullName)
      this.player1.incrementScore();
    else
      this.player2.incrementScore();

    if(this.checkIfGameIsWon()) this.endGame();
  }

  checkIfGameIsWon():boolean{
    return (this.player1.scoredPoints > Score.Forty || this.player2.scoredPoints > Score.Forty) &&
        Math.abs(this.player1.scoredPoints - this.player2.scoredPoints) >= 2;
  }

  getScore():string{
    return `${this.getScorePoints()}, ${this.player1.gamesWon}-${this.player2.gamesWon}, ${this.player1.setsWon}-${this.player2.setsWon}`;
  }

  getScorePoints(): string {
    let score: string;
    if (this.player1.scoredPoints === this.player2.scoredPoints) {
      if(this.player1.scoredPoints >= Score.Forty) score = 'Deuce';
      else score = `${this.displayScore(this.player1.scoredPoints)}-All`
    }
    else if (this.player1.scoredPoints > Score.Forty || this.player2.scoredPoints > Score.Forty) {
        score = this.displayScoreOverForty();
    }
    else {
        score = `${this.displayScore(this.player1.scoredPoints)}-${this.displayScore(this.player2.scoredPoints)}`;
    }
    return score;
  }

  displayScoreOverForty():string{
    if (this.player1.scoredPoints > this.player2.scoredPoints) return `Advantage ${this.player1.fullName}`;
    else return `Advantage ${this.player2.fullName}`;
  }

  displayScore(score: number): string{
    if(score == Score.Love) return 'Love';
    else if(score == Score.Fifteen) return 'Fifteen';
    else if(score == Score.Thirty) return 'Thirty';
    else return 'Forty';
  }

  public getGames():string{
    return `${this.player1.gamesWon}-${this.player2.gamesWon}`
  }

  endGame(): void{
    if(this.player1.scoredPoints > this.player2.scoredPoints)
      this.player1.incrementGamesWon();
    else this.player2.incrementGamesWon();

    this.player1.resetScore();
    this.player2.resetScore();

    if(this.player1.gamesWon == 6 || this.player2.gamesWon == 6){
      this.endSet();
    }
  }

  private endSet():void{
    if(this.player1.gamesWon == 6){
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

  public get fullName(){
    return this.name
  }
  public set fullName(name: string){
    this.name = name;
  }

  public incrementScore(): void{
    this.score++;
  }
  public get scoredPoints(){
    return this.score;
  }

  public resetScore(): void{
    this.score = Score.Love;
  }

  public get gamesWon(){
    return this.games;
  }

  public incrementGamesWon(): void{
    this.games++;
  }

  public resetGames(): void{
    this.games = 0;
  }

  public get setsWon(): number{
    return this.sets;
  }

  public incrementSets() : void{
    this.sets++;
  }
}
