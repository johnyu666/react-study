import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import AddBook from './books/add-book';
import Book from './books/book';
import UpdateBook from './books/update-book';

class App extends Component{
    constructor(props){
        super(props);
        this.state={books:[]};
        this.addBook=this.addBook.bind(this);
        this.currentBook={};
        this.currentBookClone={};
        this.updateRef=React.createRef();
    }
    componentDidMount(){
        let option={url:this.props.remote,type:"GET"};
        $.ajax(option)
            .done((books=>{
                this.setState({books:books});
            }))
    }
    render(){
        return (<div className="app">
            <AddBook onSubmit={this.addBook}/>
            <table>
                <tbody>
                {/*生成图书列表*/}
                {
                    this.state.books.map((book)=>{
                        return <Book key={book._id}
                                     onTrDoubleClick={()=>this.renderBookToUpdate(book)}
                                     onDeleteButtonClick={()=>this.deleteBook(book)}
                                     book={book}/>
                    })
                }
                </tbody>
            </table>

            <UpdateBook onSubmit={(e)=>{this.updateBook(e)}}  ref={this.updateRef}/>
        </div>)
    }

    deleteBook(book){
        let option={url:this.props.remote+book._id,type:"DELETE"};
        $.ajax(option)
            .done((obj)=>{
                let index=this.state.books.indexOf(book);
                this.state.books.splice(index,1);
                this.setState({books:this.state.books});
            });

    }
    renderBookToUpdate(book){
        this.currentBook=book;
        Object.assign(this.currentBookClone,this.currentBook);
        this.updateRef.current.setState({book:this.currentBookClone});
    }
    updateBook(e){
        e.preventDefault();
        let option={url:this.props.remote+this.currentBookClone._id,type:"PUT"};
        option.contentType="application/json";
        option.data=JSON.stringify(this.currentBookClone);
        $.ajax(option)
            .done((bk)=>{
                Object.assign(this.currentBook,bk);
                this.setState({books:this.state.books});
            })

    }
    addBook(book){
        let option={url:this.props.remote,type:"POST"};
        option.contentType="application/json";
        option.data=JSON.stringify(book);

        $.ajax(option)
            .done((bk)=>{
                this.state.books.push(bk);
                this.setState({books:this.state.books});
            });
    }
}

ReactDOM.render(<App remote="http://localhost:3000/books/"/>,$("#root")[0]);
