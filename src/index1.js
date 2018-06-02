import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import $ from 'jquery';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={books:[],currentBook:{bname:null,price:null}};

        this.onAddSubmitHandle=this.onAddSubmitHandle.bind(this);
        this.onChangeHandle=this.onChangeHandle.bind(this);
        this.onUpdateHandle=this.onUpdateHandle.bind(this);
        this.onUpdateHandle=this.onUpdateHandle.bind(this);
        //this.onDeleteHandle=this.onDeleteHandle.bind(this);
    }
    componentDidMount(){
        let option={url:'http://localhost:3000/books',type:'GET'};
        $.ajax(option)
            .done((books)=>{
                this.setState({"books":books});
            })
    }
    render(){
        return (<div>
            <form action="#" onSubmit={this.onAddSubmitHandle}>
                <input type="text" ref={(bname)=>this.bname=bname}/>
                <input type="text" ref={(price)=>this.price=price}/>
                <input type="submit"/>
            </form>

           <table className="table table-striped table-hover">
               <thead>
               <tr>
                   <th>name</th>
                   <th>price</th>
                   <th>操作</th>
               </tr>
               </thead>
               <tbody>
                {this.state.books.map((book)=>
                    (<tr key={book._id} onDoubleClick={(e)=>this.onToUpdateHandle(e,book)}>
                        <td>{book.bname}</td><td>{book.price}</td>
                        <td>
                            <button className="btn btn-primary" onClick={(e)=>this.onDeletehandle(e,book)}>删除</button>
                        </td>
                    </tr>)
                )}
               </tbody>
           </table>
            <div>
                <form action="#" onSubmit={this.onUpdateHandle}>
                    <input type="text" name="bname" value={this.state.currentBook.bname} onChange={this.onChangeHandle}/>
                    <input type="text" name="price" value={this.state.currentBook.price} onChange={this.onChangeHandle}/>
                    <input type="submit"/>
                </form>
            </div>

        </div>);
    }
    onChangeHandle(e){
        this.state.currentBook[e.target.name]=e.target.value;
        this.setState({currentBook:this.state.currentBook});
    }
    onToUpdateHandle(e,book){
        this.cb=book;
        Object.assign(this.state.currentBook,book);
        this.setState({"currentBook":this.state.currentBook});

    }
    onUpdateHandle(e){
        e.preventDefault();
       // let book={_id:this.currentBook._id,bname:this.state.bname,price:this.state.price};
        let option={url:'http://localhost:3000/books/'+this.state.currentBook._id,type:'PUT'};
        option.data=JSON.stringify(this.state.currentBook);
        option.contentType='application/json';
        $.ajax(option)
            .done((bk)=>{
               Object.assign(this.cb,bk);
               this.setState({books:this.state.books});
            });
    }

    onAddSubmitHandle(e){
        e.preventDefault();
        let book={bname:this.bname.value,price:this.price.value};
        let option={url:'http://localhost:3000/books/',type:'POST'};
        option.data=JSON.stringify(book);
        option.contentType='application/json';
        $.ajax(option)
            .done((bk)=>{
                this.state.books.push(bk);
                this.setState({"books":this.state.books});
            });
    }
    onDeletehandle(e,book){
        let option={url:'http://localhost:3000/books/'+book._id,type:'DELETE'};
        option.data=JSON.stringify(book);
        option.contentType='application/json';

        $.ajax(option)
            .done((o)=>{
                let index=this.state.books.indexOf(book);
                this.state.books.splice(index,1);
                this.setState({books:this.state.books});
            });
    }

}

ReactDOM.render(<App/>,document.getElementById("root"));


