import React,{Component} from 'react';


export default class UpdateBook extends Component{
    constructor(props){
        super(props);
        this.state={book:{}};
        this.onChangeHandle=this.onChangeHandle.bind(this);
    }

    render(){
        return (<div>
            <form action="#" onSubmit={this.props.onSubmit}>
                <input type="text" name="bname" value={this.state.book.bname} onChange={this.onChangeHandle}/>
                <input type="text" name="price" value={this.state.book.price} onChange={this.onChangeHandle}/>
                <button>更新</button>
            </form>
        </div>)
    }
    onChangeHandle(e){
        this.state.book[e.target.name]=e.target.value;
        this.setState({book:this.state.book})
    }
}