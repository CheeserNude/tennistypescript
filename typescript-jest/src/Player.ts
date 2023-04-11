import { Score } from "./ScoreEnum";
export class Player{
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