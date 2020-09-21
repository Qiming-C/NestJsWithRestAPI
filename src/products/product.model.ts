export class Product{
    
    constructor(public id:string,public title:string, public description:string,public price:number)
    {
        this.id=id;
        this.title=title;
        this.description=description;
        this.price=price;
    }

}