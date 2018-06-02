import React,{Component} from 'react';


export default class AddBook extends Component{
    constructor(props){
        super(props);
        this.form={};
    }
    render(){
        return (<div>
            <form action="#" onSubmit={(e)=>{this.onSubmitHandle(e)}}>
                <input type="text" ref={(input)=>this.form.bname=input}/>
                <input type="decimal" ref={(input)=>this.form.price=input}/>
                <input type="submit"/>
            </form>
        </div>)
    }

    onSubmitHandle(e){
        e.preventDefault();
        let book={};
        book.bname=this.form.bname.value;
        book.price=this.form.price.value;
        console.log(book);
        this.props.onSubmit(book);
    }
}