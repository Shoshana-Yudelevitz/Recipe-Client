export interface Recipe {
         recipeName?:string,
         descripition?:string,
         categories?:{id:number,categoryName:string},
         time?:number,
         level?:number,
         dateAdd?:Date,
         layers?:{descripitionOfLayer:string,ingredients:[string]},
         instructions?:string,
         image?:string,
         isPrivate?:boolean,
         userRecipe?:{id:number,UserName:string}
}
