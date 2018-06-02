import React,{Component} from 'react';



export default  class Book extends Component{

    render(){
        return (<tr onDoubleClick={this.props.onTrDoubleClick}>
            <td>{this.props.book.bname}</td>
            <td>{this.props.book.price}</td>
            <td><button onClick={this.props.onDeleteButtonClick}>删除</button></td>
        </tr>)
    }
}