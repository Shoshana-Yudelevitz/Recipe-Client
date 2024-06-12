export interface Recipe {
         _id?:number,
         recipeName?:string,
         descripition?:string,
         categories?:[{categoryName:string}],
         time?:number,
         level?:number,
         dateAdd?:Date,
         layers?:[{descripitionOfLayer:string,ingredients:[string]}],
         instructions?:string,
         image?:string,
         isPrivate?:boolean,
         userRecipe?:{id?:string,UserName:string}
}
